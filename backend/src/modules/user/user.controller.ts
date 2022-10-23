import { USER } from '@/modules/user/constants/user.constant';
import { UserResponseDto } from '@/modules/user/dto/user-response.dto';
import { UserDto } from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const {
  API_OPERATION,
  API_RESPONSE: {
    SUCCESS_OPERATION,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED_OPERATION,
  },
} = USER;

@Controller('unknown')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('USERS')
  @Post('users')
  @ApiOperation({
    summary: API_OPERATION.SUMMARY,
    description: API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESS_OPERATION.DESC,
    type: () => UserResponseDto,
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
    type: () => UserDto,
  })
  async createUser(@Body() bode: UserDto): Promise<UserResponseDto> {
    return await this.userService.createUser(bode);
  }
}
