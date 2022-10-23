import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { AUTH } from '@/auth/constants/auth.constant';
import { UsersLoggerService } from '@/logger/logger.service';
import { UserService } from '@/modules/user/services/user/user.service';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// TODO: Generate secret key and add to env

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: AUTH.TOKEN_EXPIRES_IN_ONE_DAY },
    }),
  ],
  providers: [AuthService, UserService, UsersLoggerService],
  controllers: [AuthController],
})
export class AuthModule {}
