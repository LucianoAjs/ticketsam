import { GET_TICKET } from '@/modules/user-buyer/cosntants/get-ticket.contant';
import { GetTicketQueryDto } from '@/modules/user-buyer/dto/get-ticket-query.dto';
import { TicketService } from '@/modules/user-buyer/services/ticket/ticket.service';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { Controller, Get, Query } from '@nestjs/common';
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
}
