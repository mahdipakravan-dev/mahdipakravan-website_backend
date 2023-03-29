import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePagePayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name : string

  @ApiPropertyOptional()
  md : string

  @ApiPropertyOptional()
  parentId : number
}
