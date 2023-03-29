import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateContactPayload {

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  email: string;

}
