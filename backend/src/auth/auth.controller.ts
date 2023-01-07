import { AuthService } from '@/auth/auth.service';
import { AUTH } from '@/auth/constants/auth.constant';
import { LoginRequestDto } from '@/auth/dto/login-request.dto';
import { LoginResponseDto } from '@/auth/dto/login-response.dto';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const {
  API_OPERATION,
  API_RESPONSE: {
    INTERNAL_SERVER_ERROR,
    SUCCESS_OPERATION,
    UNAUTHORIZED_OPERATION,
  },
} = AUTH;

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('AUTH')
  @ApiOperation({
    summary: API_OPERATION.SUMMARY,
    description: API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESS_OPERATION.DESC,
    type: () => LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  @ApiBody({
    type: () => LoginRequestDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async login(
    @Body() body: LoginRequestDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }
}
