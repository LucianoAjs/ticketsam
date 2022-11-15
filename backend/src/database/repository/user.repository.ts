import { PrismaService } from '@/database/prisma.service';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { ValidateBoatDto } from '@/modules/user-seller/dto/boat';
import { BoatResponseDto } from '@/modules/user-seller/dto/boat/boat-response.dto';
import { DocumentDto } from '@/modules/user-seller/dto/boat/nested/document.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { UserDto } from '@/modules/user-seller/dto/user';
import { AddressDto } from '@/modules/user-seller/dto/user/nested/address.dto';
import { UpdateUserDto } from '@/modules/user-seller/dto/user/update-user.dto';
import { mergeAndGetUnique } from '@/shared/utils/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: UserDto): Promise<UserDto> {
    const address: AddressDto = user?.address;
    return await this.prisma.user.create({
      data: {
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

  async updatetUser(userId: string, user: UpdateUserDto): Promise<UserDto> {
    const address: AddressDto = user?.address;
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
        address: {
          update: { ...address },
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

  async getUserById(userId: string): Promise<UserDto> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
      },
    });
  }

  async createBoatByUserId(
    userId: string,
    statusId: string,
    validateBoat: ValidateBoatDto,
  ): Promise<any> {
    const { cnpj, boat } = validateBoat;

    return await this.prisma.boat.create({
      data: {
        cnpj,
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

  async getBoatByUserId(userId: string): Promise<BoatResponseDto[]> {
    return await this.prisma.boat.findMany({
      where: { userId },
      include: { status: true, ticket: true },
    });
  }

  async upsertDocumentByUserId(
    userId: string,
    document: DocumentDto,
    documentStatusId: string,
  ): Promise<any> {
    return await this.prisma.document.upsert({
      where: { id: userId },
      update: {
        ...document,
      },
      create: {
        ...document,
        DocumentStatus: { connect: { id: documentStatusId } },
      },
    });
  }

  async creatDocumentStatus(status: string): Promise<any> {
    return await this.prisma.documentStatus.create({
      data: {
        status,
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

  async createPaymentByTicketId(createPayment: {
    ticketId: string;
    paymentId: string;
    status: string;
  }): Promise<any> {
    const { ticketId, paymentId, status } = createPayment;

    return await this.prisma.payment.create({
      data: {
        paymentId,
        status,
        ticket: { connect: { id: ticketId } },
      },
    });
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    return await this.prisma.payment.findUnique({
      where: { paymentId },
      include: { ticket: true },
    });
  }

  async getAllTicket(): Promise<CreateTicketResponseDto[]> {
    return await this.prisma.ticket.findMany({
      include: { boat: true, payment: true },
    });
  }

  async getTicketById(ticket: string): Promise<CreateTicketResponseDto> {
    return await this.prisma.ticket.findUnique({
      where: { id: ticket },
      include: { boat: true, payment: true },
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
              gte: dt_output,
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
    });
  }

  async updateTicketQtdByTicketId(ticketId: string) {
    const { remaining_quantity } = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    return await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { remaining_quantity: remaining_quantity - 1 },
    });
  }

  async getTicketByTicketId(ticketId: string) {
    return await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { payment: true },
    });
  }

  async getAllPlaces(): Promise<string[]> {
    const tickets = await this.prisma.ticket.findMany({
      select: {
        destination_city: true,
        home_city: true,
      },
    });

    const destinationCitys = tickets.map((ticket) => ticket.destination_city);
    const home_citys = tickets.map((ticket) => ticket.home_city);

    return mergeAndGetUnique(destinationCitys, home_citys);
  }
}
