import { PrismaService } from '@/database/prisma.service';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { ValidateBoatDto } from '@/modules/user-seller/dto/boat';
import { DocumentDto } from '@/modules/user-seller/dto/boat/nested/document.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { UserDto } from '@/modules/user-seller/dto/user';
import { AddressDto } from '@/modules/user-seller/dto/user/nested/address.dto';
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

  async createBoatByUserId(
    userId: string,
    statusId: string,
    validateBoat: ValidateBoatDto,
  ): Promise<any> {
    const { boat } = validateBoat;

    return await this.prisma.boat.create({
      data: {
        ...boat,
        status: { connect: { id: statusId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async creatBoatStatus(status: string): Promise<any> {
    return await this.prisma.status.create({
      data: {
        status,
      },
    });
  }

  async getBoatStatusByUserId(userId: string): Promise<any> {
    return await this.prisma.boat.findMany({
      where: { userId },
      include: { status: true, ticket: true },
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

  async getBoatStatusByBoatId(boatId: string): Promise<any> {
    return await this.prisma.status.findUnique({
      where: { boatId },
    });
  }

  async createTicketBoatId(
    boatId: string,
    createTicketDto: CreateTicketDto,
  ): Promise<any> {
    return await this.prisma.ticket.create({
      data: {
        ...createTicketDto,
        boat: { connect: { id: boatId } },
      },
    });
  }

  async getAllTicket(): Promise<CreateTicketResponseDto[]> {
    return await this.prisma.ticket.findMany({
      include: { boat: true },
    });
  }

  async getTicketByFilter({
    destination_city,
    home_city,
    dt_arrival,
    dt_output,
  }: GetTicketQueryDto): Promise<CreateTicketResponseDto[]> {
    return await this.prisma.ticket.findMany({
      where: {
        AND: [
          {
            dt_arrival: {
              lte: dt_arrival,
            },
            dt_output: {
              lte: dt_output,
            },
          },
          {
            destination_city: {
              equals: destination_city,
            },
          },
          {
            home_city: {
              equals: home_city,
            },
          },
        ],
      },
      include: { boat: true },
    });
  }
}