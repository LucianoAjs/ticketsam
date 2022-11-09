import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { UserDto } from '@/modules/user-seller/dto/user';
import { UserResponseDto } from '@/modules/user-seller/dto/user/user-response.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async createUser(body: UserDto): Promise<UserResponseDto> {
    let user;
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(body.password, SALT);

    try {
      user = await this.userRepository.upsertUser({
        ...body,
        password: hashedPassword,
      });
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return {
      statusCode: HttpStatus.CREATED,
      description: `User ${user?.id} has been updated`,
    };
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    let user;

    try {
      user = await this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return user;
  }

  async getUserById(userId: string): Promise<UserDto> {
    let user;

    try {
      user = await this.userRepository.getUserById(userId);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return user;
  }
}
