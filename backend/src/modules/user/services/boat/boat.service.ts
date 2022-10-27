import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { ValidateBoatDto } from '@/modules/user/dto/boat';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoatService {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly usersLogger: UsersLoggerService,
  ) {}

  async validateBoatOwner(userId: string, body: ValidateBoatDto) {
    try {
      this.userRepository.upsertBoatByUserId(userId, body);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    // TODO: Create table status

    return { status: 'pending' };
  }
}
