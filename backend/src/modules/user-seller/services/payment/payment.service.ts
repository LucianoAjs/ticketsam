import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { PaymentQueryDto } from '@/modules/user-seller/dto/payment-query.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async getPaymentStatusByPaymentId(param: PaymentQueryDto): Promise<any> {
    const { paymentId } = param;
    let payment;
    try {
      payment = await this.userRepository.getPaymentStatus(paymentId);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return { payment };
  }
}
