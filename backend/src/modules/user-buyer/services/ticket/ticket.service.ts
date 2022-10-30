import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async getTicket(): Promise<CreateTicketDto[]> {
    let ticket: CreateTicketDto[];
    try {
      ticket = await this.userRepository.getTicket();
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return ticket;
  }
}
