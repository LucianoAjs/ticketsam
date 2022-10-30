import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { AUTH } from '@/auth/constants/auth.constant';
import { UsersLoggerService } from '@/logger/logger.service';
import { UserService } from '@/modules/user-seller/services/user/user.service';
import { UserSellerModule } from '@/modules/user-seller/user-seller.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// TODO: Generate secret key and add to env

@Module({
  imports: [
    UserSellerModule,
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
