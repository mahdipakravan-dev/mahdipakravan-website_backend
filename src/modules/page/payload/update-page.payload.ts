import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePagePayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  id : number

  @ApiPropertyOptional()
  md : string

  @ApiPropertyOptional()
  name : string

  @ApiPropertyOptional()
  parentId : number
}
