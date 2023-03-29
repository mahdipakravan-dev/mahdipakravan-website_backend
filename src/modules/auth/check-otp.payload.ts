import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CheckOtpPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Length(4)
  otp: number;
}
