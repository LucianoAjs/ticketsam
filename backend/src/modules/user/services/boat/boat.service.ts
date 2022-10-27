import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';

import { ValidateBoatDto } from '@/modules/user/dto/boat';
import { BoatResponseDto } from '@/modules/user/dto/boat/boat-response.dto';
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
      const { id } = await this.userRepository.upsertStatusByBoatId(
        userId,
        'pending',
      );
      await this.userRepository.upsertBoatByUserId(userId, id, body);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return { status: 'pending' };
  }

  async getBoatStatusByUserId(userId: string): Promise<BoatResponseDto> {
    let boat;
    try {
      boat = await this.userRepository.getBoatStatus(userId);

      console.log(boat);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return boat;
  }
}
