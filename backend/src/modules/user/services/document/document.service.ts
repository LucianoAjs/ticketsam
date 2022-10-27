import { S3AdapterService } from '@/adapters/s3-adapter/s3-adapter.service';
import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { DOCUMENT } from '@/modules/user/constants/document.constant';
import { DocumentResponseDto } from '@/modules/user/dto/boat/document-response.dto';
import { FilesDto } from '@/modules/user/dto/files.dto';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { BadRequestException, Injectable } from '@nestjs/common';

const { DOCUMENT_BACK, DOCUMENT_FRONT, DOCUMEN_SELFIE } = DOCUMENT;

@Injectable()
export class DocumentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3AdapterService: S3AdapterService,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async uploadUserDocuments(
    userId: string,
    files: FilesDto,
  ): Promise<DocumentResponseDto> {
    try {
      await this.s3AdapterService.uploadImages(userId, files);
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }

    const s3ObjectUrls: Map<string, string> = this.s3AdapterService.buildS3Url(
      userId,
      files,
    );

    try {
      this.userRepository.upsertDocumentByUserId(userId, {
        DocumentBackUri: s3ObjectUrls.get(DOCUMENT_BACK),
        DocumentSelfieUri: s3ObjectUrls.get(DOCUMEN_SELFIE),
        DocumentFrontUri: s3ObjectUrls.get(DOCUMENT_FRONT),
      });
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return { status: 200, description: 'Documents uploaded with success.' };
  }
}
