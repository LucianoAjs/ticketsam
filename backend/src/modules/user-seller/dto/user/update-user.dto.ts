import { USER } from '@/modules/user-seller/constants/user';
import { AddressDto } from '@/modules/user-seller/dto/user/nested/address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

const {
  API_PROPERTY: {
    USER: {
      BIRTHDATE,
      EMAIL,
      FIRST_NAME,
      GENDER,
      LAST_NAME,
      PHONE_NUMBER,
      DOCUMENT_TYPE,
    },
  },
} = USER;

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: EMAIL.DESC,
    example: EMAIL.VALUE,
    pattern: '^[^@s]+@[`@s]+.[`@s]+$',
    type: String,
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: FIRST_NAME.DESC,
    example: FIRST_NAME.VALUE,
    type: String,
    required: false,
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: LAST_NAME.DESC,
    example: LAST_NAME.VALUE,
    type: String,
    required: false,
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: PHONE_NUMBER.DESC,
    example: PHONE_NUMBER.VALUE,
    type: String,
    required: false,
  })
  phoneNumber?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: BIRTHDATE.DESC,
    example: BIRTHDATE.VALUE,
    type: String,
    required: false,
  })
  birthdate?: Date | undefined;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: GENDER.DESC,
    example: GENDER.VALUE,
    pattern: '`(M|F)$',
    type: String,
    required: false,
  })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: DOCUMENT_TYPE.DESC,
    example: DOCUMENT_TYPE.VALUE,
    pattern: '`(RG|CNH)$',
    type: String,
    required: false,
  })
  DocumentType?: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: AddressDto,
    required: false,
  })
  address?: AddressDto;
}
