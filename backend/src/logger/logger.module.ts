import { UsersLoggerService } from '@/logger/logger.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UsersLoggerService],
  exports: [UsersLoggerService],
})
export class UsersLoggerModule {}
