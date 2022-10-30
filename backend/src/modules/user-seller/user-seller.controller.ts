import { VALIDATE_BOAT } from '@/modules/user-seller/constants/boat';

import { GET_BOAT_STATUS } from '@/modules/user-seller/constants/boat/get-boat-status.constant';
import { CREATE_TICKET } from '@/modules/user-seller/constants/create-ticket.contant';
import { DOCUMENT } from '@/modules/user-seller/constants/document.constant';
import { USER } from '@/modules/user-seller/constants/user';
import { ValidateBoatDto } from '@/modules/user-seller/dto/boat';
import { BoatResponseDto } from '@/modules/user-seller/dto/boat/boat-response.dto';
import { DocumentResponseDto } from '@/modules/user-seller/dto/boat/document-response.dto';
import { CreateTicketQueryDto } from '@/modules/user-seller/dto/create-ticket-query.dto';
import { CreateTicketResponseDto } from '@/modules/user-seller/dto/create-ticket-response.dto';
import { CreateTicketDto } from '@/modules/user-seller/dto/create-ticket.dto';
import { FilesDto } from '@/modules/user-seller/dto/files.dto';
import { UserDto } from '@/modules/user-seller/dto/user';
import { UserResponseDto } from '@/modules/user-seller/dto/user/user-response.dto';
import { BoatService } from '@/modules/user-seller/services/boat/boat.service';
import { DocumentService } from '@/modules/user-seller/services/document/document.service';
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
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  ) {}

  @ApiTags('USER SELLER')
  @Post('users')
  @ApiOperation({
    summary: API_OPERATION.SUMMARY,
    description: API_OPERATION.DESCRIPTION,
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
  @Post('users/upload_documents')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: DOCUMENT_FRONT, maxCount: 1 },
      { name: DOCUMENT_BACK, maxCount: 1 },
      { name: DOCUMEN_SELFIE, maxCount: 1 },
    ]),
  )
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
  @ApiConsumes('multipart/form-data')
  async uploadUserDocuments(
    @UploadedFiles()
    @Req()
    req,
  ): Promise<DocumentResponseDto> {
    const body: FilesDto = req.body;

    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.documentService.uploadUserDocuments(sub, body);
  }

  @ApiTags('USER SELLER')
  @Post('users/boat')
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
  @Get('users/boat')
  @ApiOperation({
    summary: GET_BOAT_STATUS.API_OPERATION.SUMMARY,
    description: GET_BOAT_STATUS.API_OPERATION.DESCRIPTION,
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
  async getBoatStatus(@Req() req): Promise<BoatResponseDto[]> {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.boatService.getBoatStatusByUserId(sub);
  }

  @ApiTags('USER SELLER')
  @Post('users/ticket/:boatId')
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
}