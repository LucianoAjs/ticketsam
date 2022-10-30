import { S3AdapterService } from '@/adapters/s3-adapter/s3-adapter.service';
import { PrismaModule } from '@/database/prisma.module';
import { UsersLoggerModule } from '@/logger/logger.module';
import { BoatService } from '@/modules/user-seller/services/boat/boat.service';
import { DocumentService } from '@/modules/user-seller/services/document/document.service';
import { TicketService } from '@/modules/user-seller/services/ticket/ticket.service';
import { UserService } from '@/modules/user-seller/services/user/user.service';
import { UserController } from '@/modules/user-seller/user-seller.controller';
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
export class UserSellerModule {}
