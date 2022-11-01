import { MercadoPagoAdapterService } from '@/adapters/mercado-pago-adapter/mercado-pago-adapter.service';
import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { CreatePreferenceQueryDto } from '@/modules/user-buyer/dto/create-preference-query.dto';
import { CreatePreferenceResponseDto } from '@/modules/user-buyer/dto/create-preference-response.dto';
import { CreatePreferenceDto } from '@/modules/user-buyer/dto/create-preference.dto';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
    private readonly mercadoPagoAdapterService: MercadoPagoAdapterService,
  ) {}

  async getTicket(
    filter?: GetTicketQueryDto,
  ): Promise<CreateTicketResponseDto[]> {
    let ticket: CreateTicketResponseDto[];
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

  async createPreference(
    param: CreatePreferenceQueryDto,
    body: CreatePreferenceDto,
  ): Promise<CreatePreferenceResponseDto> {
    const { ticketId } = param;
    let response;

    try {
      response = await this.mercadoPagoAdapterService.createPreference(
        ticketId,
        body,
      );
    } catch (error) {
      this.usersLogger.error(error);
    }

    const {
      body: { sandbox_init_point },
    } = response;

    return { sandbox_init_point };
  }
}
