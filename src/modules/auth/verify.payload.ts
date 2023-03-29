import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class VerifyPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Length(4)
  otp: string;
}
