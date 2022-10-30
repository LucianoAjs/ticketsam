import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { CreateTicketQueryDto } from '@/modules/user/dto/create-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user/dto/create-ticket.dto';
import { BoatStatus } from '@/modules/user/enums/boat-status.enum';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async createTicketByUserId(
    param: CreateTicketQueryDto,
    body: CreateTicketDto,
  ): Promise<CreateTicketResponseDto> {
    const { boatId } = param;
    let ticket;
    try {
      const { status } = await this.userRepository.getBoatStatusByBoatId(
        boatId,
      );

      if (BoatStatus.APPROVED === status) {
        ticket = await this.userRepository.createTicketBoatId(boatId, body);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return ticket;
  }
}
