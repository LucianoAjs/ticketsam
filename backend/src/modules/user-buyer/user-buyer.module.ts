import { MercadoPagoAdapterService } from '@/adapters/mercado-pago-adapter/mercado-pago-adapter.service';
import { UsersLoggerService } from '@/logger/logger.service';
import { GenerateQRcodeService } from '@/modules/user-buyer/services/generate-qrcode/generate-qrcode.service';
import { PaymentWebhookService } from '@/modules/user-buyer/services/payment-webhook/payment-webhook.service';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { UserBuyerController } from '@/modules/user-buyer/user-buyer.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserBuyerController],
  providers: [
    TicketService,
    UsersLoggerService,
    MercadoPagoAdapterService,
    PaymentWebhookService,
    GenerateQRcodeService,
  ],
})
export class UserBuyerModule {}
