import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginDto): Promise<object> {
    const user = await this.usersService.getUser({ email: data.email });
    if (!user) throw new BadRequestException('User does not exist');
    const tokens = await this.authService.login(
      data,
      user?._id.toString()
    );
    const payload = {
      email: user.email,
      name: user.name,
      _id: user?._id
    };
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: payload
    };
  }

  @Post('signup')
  async createUser(@Body() data: SignupDto): Promise<object> {
    const userExists = await this.usersService.getUser({
      email: data.email
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    return this.authService.signup({
      email: data.email,
      name: data.name,
      password: data.password
    });
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['_id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
