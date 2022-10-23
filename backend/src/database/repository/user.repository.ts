import { PrismaService } from '@/database/prisma.service';
import { AddressDto } from '@/modules/user/dto/nested/address.dto';
import { UserDto } from '@/modules/user/dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertUser(user: UserDto): Promise<UserDto> {
    const address: AddressDto = user?.address;
    return await this.prisma.user.upsert({
      where: { cpf: user.cpf },
      update: {
        ...user,
        address: {
          update: { ...address },
        },
      },
      create: {
        ...user,
        address: {
          create: { ...address },
        },
      },
      include: {
        address: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
