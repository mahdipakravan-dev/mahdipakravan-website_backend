import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateGalleryPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  pageId : number

  @ApiPropertyOptional()
  title : string

  @ApiPropertyOptional()
  desc : string

  @ApiPropertyOptional()
  src : string
}
