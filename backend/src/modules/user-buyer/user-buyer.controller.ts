import { CREATE_PREFERENCE } from '@/modules/user-buyer/cosntants/create-preference.constant';
import { GET_TICKET } from '@/modules/user-buyer/cosntants/get-ticket.contant';
import { CreatePreferenceQueryDto } from '@/modules/user-buyer/dto/create-preference-query.dto';
import { CreatePreferenceResponseDto } from '@/modules/user-buyer/dto/create-preference-response.dto';
import { CreatePreferenceDto } from '@/modules/user-buyer/dto/create-preference.dto';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { PaymentWebhookService } from '@/modules/user-buyer/services/payment-webhook/payment-webhook.service';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentBodyDto } from './dto/payment-body.dto';

const {
  API_RESPONSE: { INTERNAL_SERVER_ERROR, UNAUTHORIZED_OPERATION },
} = GET_TICKET;

@Controller('unknown')
export class UserBuyerController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly paymentWebhookService: PaymentWebhookService,
  ) {}

  @ApiTags('USER BUYER')
  @Get('user_buyer/ticket')
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
  @Post('user_buyer/ticket/:ticketId')
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
    @Query() param?: CreatePreferenceQueryDto,
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
}
