import { UsersLoggerModule } from '@/logger/logger.module';
import { UserLoggerMiddleware } from '@/middleware/logger.middleware';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersLoggerModule],
  providers: [UserLoggerMiddleware],
  exports: [UserLoggerMiddleware],
})
export class LoggerMiddlewareModule {}
