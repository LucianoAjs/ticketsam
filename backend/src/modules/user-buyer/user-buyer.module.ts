import { UsersLoggerService } from '@/logger/logger.service';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { UserBuyerController } from '@/modules/user-buyer/user-buyer.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserBuyerController],
  providers: [TicketService, UsersLoggerService],
})
export class UserBuyerModule {}
