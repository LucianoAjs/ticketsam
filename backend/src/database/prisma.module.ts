import { PrismaService } from '@/database/prisma.service';
import { UserRepository } from '@/database/repository/user.repository';
import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const repositories = [UserRepository];

@Global()
@Module({
  providers: [PrismaClient, PrismaService, ...repositories],
  exports: [PrismaClient, PrismaService, ...repositories],
})
export class PrismaModule {}
