import { AuthService } from '@/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { LoginRequestDto } from '../dto/login-request.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user: LoginRequestDto = request.body;

    if (!user) {
      throw new UnauthorizedException();
    }

    const { email, password } = user;

    return this.authService.validateUser(email, password);
  }
}
