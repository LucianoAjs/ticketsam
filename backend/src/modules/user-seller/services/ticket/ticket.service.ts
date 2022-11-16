import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { PaymentStatus } from '@/modules/user-buyer/enums/payment-status.enum';
import { VALIDATE_TICKET } from '@/modules/user-seller/constants/validate-ticket.constant';
import { CreateTicketQueryDto } from '@/modules/user-seller/dto/create-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { ValidateTicketResponseDto } from '@/modules/user-seller/dto/validate-ticket-response.dto';
import { ValidateTicketDto } from '@/modules/user-seller/dto/validate-ticket.dto';
import { BoatStatus } from '@/modules/user-seller/enums/boat-status.enum';
import { TicketStatus } from '@/modules/user-seller/enums/ticket-status.enum';
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

  async validateTicketByUserId(
    userId: string,
    param: ValidateTicketDto,
  ): Promise<ValidateTicketResponseDto> {
    const { paymentId, ticketId } = param;

    try {
      const { boat } = await this.userRepository.getUserById(userId);
      let ticketFound;
      boat.map((boat) =>
        boat.ticket.find((ticket) => {
          if (ticket.id === ticketId) {
            ticketFound = ticket;
          }
        }),
      );

      if (ticketFound) {
        const { id, payment } = ticketFound;
        const paymentFound = payment.find((pay) => pay.paymentId === paymentId);

        if (paymentFound && paymentFound.status === PaymentStatus.APPROVED) {
          await this.userRepository.upsertTicketStatusByTicketId(
            id,
            TicketStatus.INVALID,
          );
        } else {
          this.usersLogger.error('Payment not found or pending');
          throw new BadRequestException();
        }
      } else {
        this.usersLogger.error('Ticket not found');
        throw new BadRequestException();
      }

      return {
        statusCode: 201,
        description: VALIDATE_TICKET.API_RESPONSE.SUCCESS_OPERATION.VALUE,
      };
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }
  }
}
