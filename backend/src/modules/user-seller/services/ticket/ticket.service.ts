import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { CreateTicketQueryDto } from '@/modules/user-seller/dto/create-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { BoatStatus } from '@/modules/user-seller/enums/boat-status.enum';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { BadRequestException, Injectable } from '@nestjs/common';

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
        try {
          ticket = await this.userRepository.createTicketBoatId(boatId, body);
        } catch (error) {
          throw new PrismaException(error, this.usersLogger);
        }
      } else {
        this.usersLogger.error('Boat status not yet approved');
        throw new BadRequestException();
      }
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return ticket;
  }
}
