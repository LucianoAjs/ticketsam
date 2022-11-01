import { MercadoPagoAdapterService } from '@/adapters/mercado-pago-adapter/mercado-pago-adapter.service';
import { UsersLoggerModule } from '@/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersLoggerModule],
  providers: [MercadoPagoAdapterService],
  exports: [MercadoPagoAdapterService],
})
export class MercadoPagoAdapterModule {}
