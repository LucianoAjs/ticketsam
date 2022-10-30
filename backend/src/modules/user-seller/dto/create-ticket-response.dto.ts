import { CREATE_TICKET } from '@/modules/user-seller/constants/create-ticket.contant';
import { ApiProperty } from '@nestjs/swagger';

const { API_PROPERTY } = CREATE_TICKET;

export class CreateTicketResponseDto {
  @ApiProperty({
    description: API_PROPERTY.ACCOMODATION_NAME.DESC,
    example: API_PROPERTY.ACCOMODATION_NAME.VALUE,
    type: String,
  })
  accommodation_name: string;

  @ApiProperty({
    description: API_PROPERTY.DESTINATION_CITY.DESC,
    example: API_PROPERTY.DESTINATION_CITY.VALUE,
    type: String,
  })
  destination_city: string;

  @ApiProperty({
    description: API_PROPERTY.HOME_CITY.DESC,
    example: API_PROPERTY.HOME_CITY.VALUE,
    type: String,
  })
  home_city: string;

  @ApiProperty({
    description: API_PROPERTY.DT_ARRIVAL.DESC,
    example: API_PROPERTY.DT_ARRIVAL.VALUE,
    type: String,
    required: false,
  })
  dt_arrival: Date;

  @ApiProperty({
    description: API_PROPERTY.DT_MODIFICATION.DESC,
    example: API_PROPERTY.DT_MODIFICATION.VALUE,
    type: String,
    required: false,
  })
  dt_modification: Date;

  @ApiProperty({
    description: API_PROPERTY.DT_RECORD.DESC,
    example: API_PROPERTY.DT_RECORD.VALUE,
    type: String,
    required: false,
  })
  dt_record: Date;

  @ApiProperty({
    description: API_PROPERTY.DT_OUTPUT.DESC,
    example: API_PROPERTY.DT_OUTPUT.VALUE,
    type: String,
    required: false,
  })
  dt_output: Date;

  @ApiProperty({
    description: API_PROPERTY.BOAT_NAME.DESC,
    example: API_PROPERTY.BOAT_NAME.VALUE,
    type: String,
  })
  boat_name: string;

  @ApiProperty({
    description: API_PROPERTY.BOAT_PHONE.DESC,
    example: API_PROPERTY.BOAT_PHONE.VALUE,
    type: String,
  })
  boat_phone: string;

  @ApiProperty({
    description: API_PROPERTY.IMAGE_URL.DESC,
    example: API_PROPERTY.IMAGE_URL.VALUE,
    type: String,
  })
  image_url: string;

  @ApiProperty({
    description: API_PROPERTY.REMAINING_QUANTITY.DESC,
    example: API_PROPERTY.REMAINING_QUANTITY.VALUE,
    type: Number,
  })
  remaining_quantity: number;

  @ApiProperty({
    description: API_PROPERTY.FOOD_VALUE.DESC,
    example: API_PROPERTY.FOOD_VALUE.VALUE,
    type: Number,
  })
  food_value: number;

  @ApiProperty({
    description: API_PROPERTY.TRANSPORT_VALUE.DESC,
    example: API_PROPERTY.TRANSPORT_VALUE.VALUE,
    type: Number,
  })
  transport_value: number;
}
