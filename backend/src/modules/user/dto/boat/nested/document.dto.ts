import { DOCUMENT } from '@/modules/user/constants/document.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import 'multer';

const { BACK, FRONT, SELFIE } = DOCUMENT;

export class DocumentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: BACK.DESC,
    example: BACK.VALUE,
    type: String,
  })
  DocumentBackUri: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: FRONT.DESC,
    example: FRONT.VALUE,
    type: String,
  })
  DocumentFrontUri: string;

  @ApiProperty({
    description: SELFIE.DESC,
    example: SELFIE.VALUE,
    type: String,
  })
  DocumentSelfieUri: string;
}
