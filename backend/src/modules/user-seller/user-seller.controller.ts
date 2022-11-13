import { VALIDATE_BOAT } from '@/modules/user-seller/constants/boat';

import { GET_BOAT_STATUS } from '@/modules/user-seller/constants/boat/get-boat-status.constant';
import { CREATE_TICKET } from '@/modules/user-seller/constants/create-ticket.contant';
import { DOCUMENT } from '@/modules/user-seller/constants/document.constant';
import { PAYMENT_STATUS } from '@/modules/user-seller/constants/payment-status.constant';
import { USER } from '@/modules/user-seller/constants/user';
import { ValidateBoatDto } from '@/modules/user-seller/dto/boat';
import { BoatResponseDto } from '@/modules/user-seller/dto/boat/boat-response.dto';
import { DocumentResponseDto } from '@/modules/user-seller/dto/boat/document-response.dto';
import { CreateTicketQueryDto } from '@/modules/user-seller/dto/create-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { FilesDto } from '@/modules/user-seller/dto/files.dto';
import { PaymentQueryDto } from '@/modules/user-seller/dto/payment-query.dto';
import { UserDto } from '@/modules/user-seller/dto/user';
import { UserResponseDto } from '@/modules/user-seller/dto/user/user-response.dto';
import { BoatService } from '@/modules/user-seller/services/boat/boat.service';
import { DocumentService } from '@/modules/user-seller/services/document/document.service';
import { PaymentService } from '@/modules/user-seller/services/payment/payment.service';
import { TicketService } from '@/modules/user-seller/services/ticket/ticket.service';
import { UserService } from '@/modules/user-seller/services/user/user.service';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { parseJwt } from '@/shared/utils/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/user/update-user.dto';

const {
  API_OPERATION,
  API_RESPONSE: {
    SUCCESS_OPERATION,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED_OPERATION,
  },
} = USER;

const { DOCUMENT_BACK, DOCUMENT_FRONT, DOCUMEN_SELFIE } = DOCUMENT;

@Controller('unknown')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly boatService: BoatService,
    private readonly documentService: DocumentService,
    private readonly ticketService: TicketService,
    private readonly paymentService: PaymentService,
  ) {}

  @ApiTags('USER SELLER')
  @Post('user_seller')
  @ApiOperation({
    summary: API_OPERATION.CREATE_USER.SUMMARY,
    description: API_OPERATION.CREATE_USER.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESS_OPERATION.DESC,
    type: () => UserResponseDto,
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
    type: () => UserDto,
  })
  async createUser(@Body() body: UserDto): Promise<UserResponseDto> {
    return await this.userService.createUser(body);
  }

  @ApiTags('USER SELLER')
  @Put('user_seller')
  @ApiOperation({
    summary: API_OPERATION.UPDATE_USER.SUMMARY,
    description: API_OPERATION.UPDATE_USER.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESS_OPERATION.DESC,
    type: () => UserResponseDto,
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
    type: () => UpdateUserDto,
  })
  async updateUser(
    @Body() body: UpdateUserDto,
    @Req()
    req,
  ): Promise<UserResponseDto> {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);
    return await this.userService.updateUser(sub, body);
  }

  @ApiTags('USER SELLER')
  @Get('user_seller')
  @ApiOperation({
    summary: API_OPERATION.GET_USER_BY_ID.SUMMARY,
    description: API_OPERATION.GET_USER_BY_ID.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESS_OPERATION.DESC,
    type: () => UserDto,
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
  async getUser(
    @Req()
    req,
  ): Promise<UserDto> {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);
    return await this.userService.getUserById(sub);
  }

  @ApiTags('USER SELLER')
  @Post('user_seller/upload_documents')
  @ApiOperation({
    summary: DOCUMENT.API_OPERATION.SUMMARY,
    description: DOCUMENT.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: DOCUMENT.API_RESPONSE.SUCCESS_OPERATION.DESC,
    type: () => DocumentResponseDto,
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
    type: () => FilesDto,
  })
  async uploadUserDocuments(@Req() req): Promise<DocumentResponseDto> {
    const body: FilesDto = req.body;

    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.documentService.uploadUserDocuments(sub, body);
  }

  @ApiTags('USER SELLER')
  @Post('user_seller/boat')
  @ApiOperation({
    summary: VALIDATE_BOAT.API_OPERATION.SUMMARY,
    description: VALIDATE_BOAT.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: VALIDATE_BOAT.API_RESPONSE.SUCCESS_OPERATION.DESC,
    type: () => BoatResponseDto,
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
    type: () => ValidateBoatDto,
  })
  async validateBoatOwner(@Body() body: ValidateBoatDto, @Req() req) {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.boatService.validateBoatOwner(sub, body);
  }

  @ApiTags('USER SELLER')
  @Get('user_seller/boat')
  @ApiOperation({
    summary: GET_BOAT_STATUS.API_OPERATION.SUMMARY,
    description: GET_BOAT_STATUS.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    isArray: true,
    description: VALIDATE_BOAT.API_RESPONSE.SUCCESS_OPERATION.DESC,
    type: () => BoatResponseDto,
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
  async getBoatStatus(@Req() req): Promise<BoatResponseDto[]> {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.boatService.getBoatStatusByUserId(sub);
  }

  @ApiTags('USER SELLER')
  @Post('user_seller/boat/:boatId/ticket')
  @ApiOperation({
    summary: CREATE_TICKET.API_OPERATION.SUMMARY,
    description: CREATE_TICKET.API_OPERATION.DESCRIPTION,
  })
  @ApiResponse({
    status: 201,
    description: CREATE_TICKET.API_RESPONSE.SUCCESS_OPERATION.DESC,
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
  async createTicketByUserId(
    @Body() body: CreateTicketDto,
    @Param() params: CreateTicketQueryDto,
  ): Promise<CreateTicketResponseDto> {
    return this.ticketService.createTicketByUserId(params, body);
  }

  @ApiTags('USER SELLER')
  @Get('user_seller/payment/status')
  @ApiOperation({
    summary: PAYMENT_STATUS.API_OPERATION.SUMMARY,
    description: PAYMENT_STATUS.API_OPERATION.DESCRIPTION,
  })
  //@ApiResponse({
  //  status: 201,
  //  description: VALIDATE_BOAT.API_RESPONSE.SUCCESS_OPERATION.DESC,
  //  type: () => BoatResponseDto,
  //})
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
  async getPaymentStatus(@Query() param?: PaymentQueryDto): Promise<any> {
    return this.paymentService.getPaymentStatusByPaymentId(param);
  }
}
