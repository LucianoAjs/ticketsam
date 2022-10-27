import { PrismaService } from '@/database/prisma.service';
import { ValidateBoatDto } from '@/modules/user/dto/boat';
import { DocumentDto } from '@/modules/user/dto/boat/nested/document.dto';
import { UserDto } from '@/modules/user/dto/user';
import { AddressDto } from '@/modules/user/dto/user/nested/address.dto';
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

  async upsertBoatByUserId(
    userId: string,
    statusId: string,
    validateBoat: ValidateBoatDto,
  ): Promise<any> {
    const { boat } = validateBoat;

    return await this.prisma.boat.upsert({
      where: { IMO: boat.IMO },
      update: {
        userId,
        ...boat,
        statusId,
      },
      create: {
        userId,
        ...boat,
        statusId,
      },
    });
  }

  async upsertStatusByBoatId(userId: string, status: string): Promise<any> {
    return await this.prisma.status.upsert({
      where: { userId },
      update: {
        userId,
        status,
      },
      create: {
        userId,
        status,
      },
    });
  }

  async getBoatStatus(userId: string): Promise<any> {
    return await this.prisma.boat.findUnique({
      where: { userId },
      include: {
        status: true,
      },
    });
  }

  async upsertDocumentByUserId(
    userId: string,
    document: DocumentDto,
  ): Promise<any> {
    return await this.prisma.document.upsert({
      where: { id: userId },
      update: {
        ...document,
      },
      create: {
        ...document,
      },
    });
  }
}
