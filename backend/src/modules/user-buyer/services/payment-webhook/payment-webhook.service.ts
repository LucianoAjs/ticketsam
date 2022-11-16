import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { PaymentBodyDto } from '@/modules/user-buyer/dto/payment-body.dto';
import { PaymentResponseDto } from '@/modules/user-buyer/dto/payment-response.dto';
import { PaymentStatus } from '@/modules/user-buyer/enums/payment-status.enum';
import { TicketStatus } from '@/modules/user-seller/enums/ticket-status.enum';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentWebhookService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async webhookPayment(body: PaymentBodyDto): Promise<PaymentResponseDto> {
    const { external_reference, payment_id, status } = body;

    const createPayment = {
      ticketId: external_reference,
      paymentId: payment_id,
      status,
    };

    if (status === PaymentStatus.APPROVED) {
      try {
        await this.userRepository.updateTicketQtdByTicketId(external_reference);
      } catch (error) {
        throw new PrismaException(error, this.usersLogger);
      }

      try {
        await this.userRepository.upsertTicketStatusByTicketId(
          external_reference,
          TicketStatus.VALID,
        );
      } catch (error) {
        throw new PrismaException(error, this.usersLogger);
      }
    }

    try {
      await this.userRepository.createPaymentByTicketId(createPayment);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return {
      statusCode: 201,
      status,
      paymentId: payment_id,
    };
  }
}
