import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { PaymentBodyDto } from '@/modules/user-buyer/dto/payment-body.dto';
import { PaymentResponseDto } from '@/modules/user-buyer/dto/payment-response.dto';
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
