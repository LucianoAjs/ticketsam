import { NodemailerAdapterService } from '@/adapters/nodemailer.adapter/nodemailer-adapter.service';
import { UsersLoggerModule } from '@/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersLoggerModule],
  providers: [NodemailerAdapterService],
  exports: [NodemailerAdapterService],
})
export class NodemailerAdapterModule {}
