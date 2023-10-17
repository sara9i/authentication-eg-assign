import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './stratergies/accessToken.strategy';
import { LocalStrategy } from './stratergies/local-strategy';
import { RefreshTokenStrategy } from './stratergies/refreshToken.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
  ],
  providers: [
    AuthService,
    UsersService,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    LocalStrategy,
    Logger
  ],
  controllers: [AuthController]
})
export class AuthModule {}
