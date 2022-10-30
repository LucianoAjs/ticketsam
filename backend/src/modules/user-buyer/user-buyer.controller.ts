import { GET_TICKET } from '@/modules/user-buyer/cosntants/get-ticket.contant';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const {
  API_RESPONSE: { INTERNAL_SERVER_ERROR, UNAUTHORIZED_OPERATION },
} = GET_TICKET;

@Controller('unknown')
export class UserBuyerController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiTags('USER BUYER')
  @Get('users/ticket')
  @ApiOperation({
    summary: GET_TICKET.API_OPERATION.SUMMARY,
    description: GET_TICKET.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: GET_TICKET.API_RESPONSE.SUCCESS_OPERATION.DESC,
    isArray: true,
    type: () => CreateTicketDto,
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
  async createTicketByUserId(): Promise<CreateTicketDto[]> {
    return await this.ticketService.getTicket();
  }
}
