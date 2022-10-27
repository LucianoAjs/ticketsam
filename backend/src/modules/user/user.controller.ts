import { VALIDATE_BOAT } from '@/modules/user/constants/boat';

import { GET_BOAT_STATUS } from '@/modules/user/constants/boat/get-boat-status.constant';
import { DOCUMENT } from '@/modules/user/constants/document.constant';
import { USER } from '@/modules/user/constants/user';
import { ValidateBoatDto } from '@/modules/user/dto/boat';
import { BoatResponseDto } from '@/modules/user/dto/boat/boat-response.dto';
import { DocumentResponseDto } from '@/modules/user/dto/boat/document-response.dto';
import { FilesDto } from '@/modules/user/dto/files.dto';
import { UserDto } from '@/modules/user/dto/user';
import { UserResponseDto } from '@/modules/user/dto/user/user-response.dto';
import { BoatService } from '@/modules/user/services/boat/boat.service';
import { DocumentService } from '@/modules/user/services/document/document.service';
import { UserService } from '@/modules/user/services/user/user.service';
import { InternalServerErrorException } from '@/shared/errors/internal-server-error.exception';
import { UnauthorizedException } from '@/shared/errors/unauthorized.exception';
import { parseJwt } from '@/shared/utils/common';
import {
  Body,
  Controller,
  Get,
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
  ) {}

  @ApiTags('USERS')
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
  async createUser(@Body() bode: UserDto): Promise<UserResponseDto> {
    return await this.userService.createUser(bode);
  }

  @ApiTags('USERS')
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

  @ApiTags('USERS')
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

  @ApiTags('USERS')
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
  async getBoatStatus(@Req() req): Promise<BoatResponseDto> {
    const jwt = req.headers['authorization'];
    const { sub } = parseJwt(jwt);

    return this.boatService.getBoatStatusByUserId(sub);
  }
}
