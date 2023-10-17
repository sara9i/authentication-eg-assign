import {
  ForbiddenException,
  Injectable,
  Logger,
  NotAcceptableException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: Logger
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(data: any, id: string) {
    if (!data?._id) {
      data._id = id;
    }
    const tokens = await this.getTokens(data);
    // await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;
  }

  async signup(user: any) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    const newUser = await this.usersService.createUser(
      user.name,
      user.email,
      hashedPassword
    );
    const payload = {
      email: newUser.email,
      name: newUser.name,
      _id: JSON.stringify(newUser?._id)
    };
    const tokens = await this.getTokens(payload);
    // await this.updateRefreshToken(
    //   JSON.stringify(newUser._id),
    //   tokens.refreshToken
    // );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: payload
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const saltOrRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      saltOrRounds
    );
    await this.usersService.update(id, {
      refreshToken: hashedRefreshToken
    });
  }

  async getTokens(userPayload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          ...userPayload
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
      ),
      this.jwtService.signAsync(
        {
          ...userPayload
        },
        {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
      )
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      user.refreshToken,
      refreshToken
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    // await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async logout(userId: string) {
    this.usersService.update(userId, { refreshToken: null });
  }
}
