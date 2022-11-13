import { S3AdapterService } from '@/adapters/s3-adapter/s3-adapter.service';
import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { DocumentResponseDto } from '@/modules/user-seller/dto/boat/document-response.dto';
import { FilesDto } from '@/modules/user-seller/dto/files.dto';
import { DocumentType } from '@/modules/user-seller/enums/document-type.enum';
import { PrismaException } from '@/shared/errors/prisma.exception';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Document } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly s3AdapterService: S3AdapterService,
    private readonly usersLogger: UsersLoggerService,
    private readonly configService: ConfigService,
  ) {}

  async uploadUserDocuments(
    userId: string,
    file: FilesDto,
  ): Promise<DocumentResponseDto> {
    try {
      await this.s3AdapterService.uploadImages(userId, file);
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }

    const documentUri: string =
      this.configService.get('S3_BASE_URL') +
      `${this.s3AdapterService.buildS3Url(
        userId,
        file.documentType,
        file.extension,
      )}`;

    try {
      let document: Document;
      const defaultStatus = 'pending';

      this.mapDocumentType(document, documentUri, file.documentType);

      const { id } = await this.userRepository.creatDocumentStatus(
        defaultStatus,
      );
      this.userRepository.upsertDocumentByUserId(userId, document, id);
    } catch (error) {
      throw new PrismaException(error, this.usersLogger);
    }

    return {
      status: 200,
      description: 'Documents uploaded with success.',
      documentUri,
    };
  }

  private mapDocumentType(
    document: Document,
    documentUri: string,
    documentType: string,
  ): void {
    if (documentType === DocumentType.DOCUMENT_FRONT) {
      document.DocumentFrontUri = documentUri;
    }
    if (documentType === DocumentType.DOCUMENT_BACK) {
      document.DocumentBackUri = documentUri;
    }
    if (documentType === DocumentType.DOCUMEN_SELFIE) {
      document.DocumentSelfieUri = documentUri;
    }
  }
}
