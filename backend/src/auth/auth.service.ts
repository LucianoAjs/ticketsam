import { UserService } from '@/modules/user-seller/services/user/user.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: LoginRequestDto) {
    const response = await this.userService.getUserByEmail(user.email);
    const payload = { email: user.email, sub: response.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
