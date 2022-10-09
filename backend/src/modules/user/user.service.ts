import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { UserResponseDto } from '@/modules/user/dto/user-response.dto';
import { UserDto } from '@/modules/user/dto/user.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async createUser(body: UserDto): Promise<UserResponseDto> {
    let user;

    try {
      user = await this.userRepository.upsertUser(body);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return {
      statusCode: HttpStatus.CREATED,
      description: `User ${user?.id} has been updated`,
    };
  }
}
