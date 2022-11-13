import { UsersLoggerService } from '@/logger/logger.service';
import { FilesDto } from '@/modules/user-seller/dto/files.dto';
import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type S3Params = {
  Bucket: string;
  Key: string;
  Body: Buffer;
};

@Injectable()
export class S3AdapterService extends S3Client {
  constructor(
    protected readonly configService: ConfigService,
    private readonly usersLogger: UsersLoggerService,
  ) {
    super({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_SECRET_KEY'),
      },
    });
  }

  async uploadImages(
    userId: string,
    files: FilesDto,
  ): Promise<PutObjectCommandOutput | void> {
    const { dataUrl, documentType, extension } = files;
    const BASE64_DATA = 1;

    try {
      const fileBuffer: Buffer = Buffer.from(
        dataUrl.split(',')[BASE64_DATA],
        'base64',
      );

      const params: S3Params = this.getParams(
        documentType,
        this.buildS3Url(userId, documentType, extension),
        fileBuffer,
      );

      return await this.send(new PutObjectCommand(params));
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }
  }

  buildS3Url(userId: string, documentType: string, extension: string): string {
    return `${userId}-${documentType}.${extension}`;
  }

  private getParams(
    folderName: string,
    fieldName: string,
    file: Buffer,
  ): S3Params {
    return {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: `${folderName}/${fieldName}`,
      Body: file,
    };
  }
}
