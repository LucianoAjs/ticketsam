import { USER } from '@/modules/user-seller/constants/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

const {
  API_PROPERTY: {
    USER: {
      ADDRESS: {
        POSTAL_CODE,
        CITY,
        COMPLEMENT,
        NEIGHBORHOOD,
        NUMBER,
        STATE,
        STREET,
      },
    },
  },
} = USER;

export class AddressDto {
  id?: string;
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: POSTAL_CODE.DESC,
    example: POSTAL_CODE.VALUE,
    pattern: '^d{8}$',
    type: String,
    required: false,
  })
  postalCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: COMPLEMENT.DESC,
    example: COMPLEMENT.VALUE,
    type: String,
    required: false,
  })
  complement?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: STATE.DESC,
    example: STATE.VALUE,
    pattern: '^[A-Z]{2}$',
    type: String,
    required: false,
  })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: CITY.DESC,
    example: CITY.VALUE,
    type: String,
    required: false,
  })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: NUMBER.DESC,
    example: NUMBER.VALUE,
    type: String,
    required: false,
  })
  number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: NEIGHBORHOOD.DESC,
    example: NEIGHBORHOOD.VALUE,
    type: String,
    required: false,
  })
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: STREET.DESC,
    example: STREET.VALUE,
    type: String,
    required: false,
  })
  street?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
