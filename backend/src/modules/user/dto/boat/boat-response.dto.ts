import { BoatDto } from '@/modules/user/dto/boat/nested/boat.dto';
import { StatusDto } from '@/modules/user/dto/boat/nested/status.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BoatResponseDto {
  @ApiProperty({
    type: BoatDto,
  })
  boat: BoatDto;

  @ApiProperty({
    type: StatusDto,
  })
  status: StatusDto;
}
