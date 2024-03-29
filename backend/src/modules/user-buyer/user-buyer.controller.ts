import { CREATE_PREFERENCE } from '@/modules/user-buyer/constants/create-preference.constant';
import { GENERATE_QRCODE } from '@/modules/user-buyer/constants/generate-qrcode.constant';
import { GET_TICKET } from '@/modules/user-buyer/constants/get-ticket.contant';
import { CreatePreferenceQueryDto } from '@/modules/user-buyer/dto/create-preference-query.dto';
import { CreatePreferenceResponseDto } from '@/modules/user-buyer/dto/create-preference-response.dto';
import { CreatePreferenceDto } from '@/modules/user-buyer/dto/create-preference.dto';
import { GenerateQRcodeResponseDto } from '@/modules/user-buyer/dto/generate-qrcode-response.dto';
import { GenerateQRcodeDto } from '@/modules/user-buyer/dto/generate-qrcode.dto';
import { GetTicketParamDto } from '@/modules/user-buyer/dto/get-ticket-param.dto';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { PaymentBodyDto } from '@/modules/user-buyer/dto/payment-body.dto';
import { GenerateQRcodeService } from '@/modules/user-buyer/services/generate-qrcode/generate-qrcode.service';
import { PaymentWebhookService } from '@/modules/user-buyer/services/payment-webhook/payment-webhook.service';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GET_ALL_PLACES_AVAILABLE } from './constants/get-all-places-available.constant';
import { GET_TICKET_BY_ID } from './constants/get-ticket-by-id.constant';

const {
  API_RESPONSE: { INTERNAL_SERVER_ERROR, UNAUTHORIZED_OPERATION },
} = GET_TICKET;

@Controller()
export class UserBuyerController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly paymentWebhookService: PaymentWebhookService,
    private readonly generateQRcodeService: GenerateQRcodeService,
  ) {}

  @ApiTags('USER BUYER')
  @Get('user-buyer/ticket')
  @ApiOperation({
    summary: GET_TICKET.API_OPERATION.SUMMARY,
    description: GET_TICKET.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  async getTicketList(
    @Query() filter?: GetTicketQueryDto,
  ): Promise<CreateTicketResponseDto[]> {
    return await this.ticketService.getTicket(filter);
  }

  @ApiTags('USER BUYER')
  @Get('user-buyer/ticket/:ticketId')
  @ApiOperation({
    summary: GET_TICKET_BY_ID.API_OPERATION.SUMMARY,
    description: GET_TICKET_BY_ID.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: GET_TICKET_BY_ID.API_OPERATION.DESCRIPTION,
    type: () => CreateTicketResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  async getTicketByTicketId(
    @Param() param?: GetTicketParamDto,
  ): Promise<CreateTicketResponseDto> {
    return await this.ticketService.getTicketByTicketId(param);
  }

  @ApiTags('USER BUYER')
  @Post('user-buyer/ticket/:ticketId')
  @ApiOperation({
    summary: CREATE_PREFERENCE.API_OPERATION.SUMMARY,
    description: CREATE_PREFERENCE.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  @ApiBody({
    type: () => CreatePreferenceDto,
  })
  async createTicket(
    @Body() body: CreatePreferenceDto,
    @Param() param?: CreatePreferenceQueryDto,
  ): Promise<CreatePreferenceResponseDto> {
    return await this.ticketService.createPreference(param, body);
  }

  @ApiTags('USER BUYER')
  @Post('webhook')
  @ApiBody({
    type: () => PaymentBodyDto,
  })
  async webhookPayment(@Body() body: PaymentBodyDto) {
    return await this.paymentWebhookService.webhookPayment(body);
  }

  @ApiTags('USER BUYER')
  @Post('user-buyer/generate-qrcode')
  @ApiOperation({
    summary: GENERATE_QRCODE.API_OPERATION.SUMMARY,
    description: GENERATE_QRCODE.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: GENERATE_QRCODE.API_RESPONSE.SUCCESS_OPERATION.DESC,
    type: () => GenerateQRcodeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    status: 500,
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  @ApiBody({
    type: () => GenerateQRcodeDto,
  })
  async generateQRcode(
    @Body() body: GenerateQRcodeDto,
  ): Promise<GenerateQRcodeResponseDto> {
    return this.generateQRcodeService.generateQrcode(body);
  }

  @ApiTags('USER BUYER')
  @Get('user-buyer/states')
  @ApiOperation({
    summary: GET_ALL_PLACES_AVAILABLE.API_OPERATION.SUMMARY,
    description: GET_ALL_PLACES_AVAILABLE.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: GET_ALL_PLACES_AVAILABLE.API_PROPERTY.PLACE_NAMES.DESC,
    isArray: true,
    type: () => [],
  })
  @ApiResponse({
    status: 401,
    description: UNAUTHORIZED_OPERATION,
    type: () => UnauthorizedException,
  })
  @ApiResponse({
    description: INTERNAL_SERVER_ERROR,
    type: () => InternalServerErrorException,
  })
  async getAllStates(): Promise<string[]> {
    return await this.ticketService.getAllPlaceNames();
  }
}
