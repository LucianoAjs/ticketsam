import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';

import { ValidateBoatDto } from '@/modules/user-seller/dto/boat';
import { BoatResponseDto } from '@/modules/user-seller/dto/boat/boat-response.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoatService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async validateBoatOwner(userId: string, body: ValidateBoatDto) {
    const defaultStatus = 'pending';
    let statusData;
    try {
      statusData = await this.userRepository.creatBoatStatus(defaultStatus);
      await this.userRepository.createBoatByUserId(userId, statusData.id, body);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return { status: statusData?.status };
  }

  async getBoatStatusByUserId(userId: string): Promise<BoatResponseDto[]> {
    let boat;
    try {
      boat = await this.userRepository.getBoatStatusByUserId(userId);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return boat;
  }
}
