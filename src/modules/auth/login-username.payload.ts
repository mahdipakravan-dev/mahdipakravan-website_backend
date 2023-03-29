import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUsernamePayload {
  @ApiProperty({
    required: false,
  })
  username: string;

  @ApiProperty({
    required: false,
  })
  password: string;

  @ApiProperty({
    required: false,
  })
  phoneNumber: string;
}
