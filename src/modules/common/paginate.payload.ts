import { ApiProperty } from '@nestjs/swagger';

export class PaginatePayload {
  @ApiProperty({
    required: true,
  })
  page: number;

  @ApiProperty({
    required: true,
  })
  limit: number;
}
