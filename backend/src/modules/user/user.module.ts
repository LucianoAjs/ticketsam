import { PrismaModule } from '@/database/prisma.module';
import { UsersLoggerModule } from '@/logger/logger.module';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, UsersLoggerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
