import { CREATE_TICKET } from '@/modules/user-seller/constants/create-ticket.contant';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const { API_PROPERTY } = CREATE_TICKET;

export class GetTicketQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: API_PROPERTY.DESTINATION_CITY.DESC,
    example: API_PROPERTY.DESTINATION_CITY.VALUE,
    type: String,
    required: false,
  })
  destination_city?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: API_PROPERTY.HOME_CITY.DESC,
    example: API_PROPERTY.HOME_CITY.VALUE,
    type: String,
    required: false,
  })
  home_city?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: API_PROPERTY.DT_ARRIVAL.DESC,
    example: API_PROPERTY.DT_ARRIVAL.VALUE,
    type: String,
    required: false,
  })
  dt_arrival?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: API_PROPERTY.DT_OUTPUT.DESC,
    example: API_PROPERTY.DT_OUTPUT.VALUE,
    type: String,
    required: false,
  })
  dt_output?: Date;
}
