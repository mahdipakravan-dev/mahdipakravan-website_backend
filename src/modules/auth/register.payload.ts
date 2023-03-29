import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
