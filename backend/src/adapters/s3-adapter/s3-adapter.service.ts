import { UsersLoggerService } from '@/logger/logger.service';
import { DOCUMENT } from '@/modules/user-seller/constants/document.constant';
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

const { DOCUMENT_BACK, DOCUMENT_FRONT, DOCUMEN_SELFIE, INDEX } = DOCUMENT;

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
    const firstIndex = 0;

    try {
      const filesArray = Object.values(files);

      await Promise.all(
        filesArray.map(async (file: Express.Multer.File[]) => {
          const params: S3Params = this.getParams(
            userId,
            file[firstIndex].fieldname,
            file[firstIndex].buffer,
          );

          return await this.send(new PutObjectCommand(params));
        }),
      );
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException();
    }
  }

  buildS3Url(userId: string, files: FilesDto): Map<string, string> {
    const filesArray: string[] = Object.keys(files);

    const objectUrls: string[] = filesArray.map((fileName: string) => {
      return (
        this.configService.get('S3_BASE_URL') +
        `${fileName}/${userId}-${fileName}.png`
      );
    });

    const s3UrlMap = new Map<string, string>([
      [DOCUMENT_FRONT, objectUrls[INDEX.DOCUMENT_FRONT]],
      [DOCUMENT_BACK, objectUrls[INDEX.DOCUMENT_BACK]],
      [DOCUMEN_SELFIE, objectUrls[INDEX.SELFIE]],
    ]);

    return s3UrlMap;
  }

  private getParams(userId: string, fieldName: string, file: Buffer): S3Params {
    return {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: `${fieldName}/${userId}-${fieldName}.png`,
      Body: file,
    };
  }
}
