import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async getTicket(
    filter?: GetTicketQueryDto,
  ): Promise<CreateTicketResponseDto[]> {
    let ticket: CreateTicketResponseDto[];
    console.log(filter);
    try {
      if (Object.values(filter).length === 0) {
        ticket = await this.userRepository.getAllTicket();
      } else {
        ticket = await this.userRepository.getTicketByFilter(filter);
      }
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return ticket;
  }
}
