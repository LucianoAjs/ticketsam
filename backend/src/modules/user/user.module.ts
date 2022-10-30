import { S3AdapterService } from '@/adapters/s3-adapter/s3-adapter.service';
import { PrismaModule } from '@/database/prisma.module';
import { UsersLoggerModule } from '@/logger/logger.module';
import { BoatService } from '@/modules/user/services/boat/boat.service';
import { DocumentService } from '@/modules/user/services/document/document.service';
import { TicketService } from '@/modules/user/services/ticket/boat.service';
import { UserService } from '@/modules/user/services/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, UsersLoggerModule],
  controllers: [UserController],
  providers: [
    UserService,
    BoatService,
    S3AdapterService,
    DocumentService,
    TicketService,
  ],
})
export class UserModule {}
