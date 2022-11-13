import { DOCUMENT } from '@/modules/user-seller/constants/document.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import 'multer';
import { DocumentType } from '../enums/document-type.enum';

const { EXTENSION, DATA_URL, DOCUMENT_TYPE } = DOCUMENT;

export class FilesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: EXTENSION.DESC,
    example: EXTENSION.VALUE,
    type: String,
  })
  extension: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: DATA_URL.DESC,
    example: DATA_URL.VALUE,
    type: String,
  })
  dataUrl: string;

  @IsNotEmpty()
  @IsEnum(DocumentType)
  @ApiProperty({
    description: DOCUMENT_TYPE.DESC,
    example: DOCUMENT_TYPE.VALUE,
  })
  documentType: string;
}
