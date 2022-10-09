import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorException extends HttpException {
  @ApiProperty({
    type: Number,
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Internal server error',
  })
  message: string;

  @ApiProperty({
    type: String,
    example: 'Internal server error',
  })
  error: string;

  constructor() {
    super(
      {
        message: 'Server error, something went wrong',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
