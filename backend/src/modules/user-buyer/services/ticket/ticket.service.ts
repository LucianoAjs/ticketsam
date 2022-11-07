import { MercadoPagoAdapterService } from '@/adapters/mercado-pago-adapter/mercado-pago-adapter.service';
import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { CreatePreferenceQueryDto } from '@/modules/user-buyer/dto/create-preference-query.dto';
import { CreatePreferenceResponseDto } from '@/modules/user-buyer/dto/create-preference-response.dto';
import { CreatePreferenceDto } from '@/modules/user-buyer/dto/create-preference.dto';
import { GetTicketParamDto } from '@/modules/user-buyer/dto/get-ticket-param.dto';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { BadRequestException, Injectable } from '@nestjs/common';

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

  async getTicketByTicketId(
    param?: GetTicketParamDto,
  ): Promise<CreateTicketResponseDto> {
    const { ticketId } = param;
    let ticket: CreateTicketResponseDto;
    try {
      ticket = await this.userRepository.getTicketById(ticketId);
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
      const { remaining_quantity } =
        await this.userRepository.getTicketByTicketId(ticketId);

      if (remaining_quantity <= 0) {
        this.usersLogger.error('No tickets available');
        throw new BadRequestException();
      }
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }

    try {
      response = await this.mercadoPagoAdapterService.createPreference(
        ticketId,
        body,
      );
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }

    const {
      body: { sandbox_init_point },
    } = response;

    return { sandbox_init_point };
  }
}
