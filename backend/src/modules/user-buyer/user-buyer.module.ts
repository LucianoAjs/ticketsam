import { Module } from '@nestjs/common';
import { UserBuyerController } from './user-buyer.controller';

@Module({
  controllers: [UserBuyerController],
})
export class UserBuyerModule {}
