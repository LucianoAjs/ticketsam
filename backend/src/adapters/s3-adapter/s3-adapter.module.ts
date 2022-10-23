import { S3AdapterService } from '@/adapters/s3-adapter/s3-adapter.service';
import { UsersLoggerModule } from '@/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersLoggerModule],
  providers: [S3AdapterService],
  exports: [S3AdapterService],
})
export class S3AdapterModule {}
