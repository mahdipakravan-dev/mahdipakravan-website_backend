import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CheckUserPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  phoneNumber: string;
}
