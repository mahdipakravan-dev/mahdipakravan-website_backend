import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateGalleryPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  id : number

  @ApiPropertyOptional()
  title : string

  @ApiPropertyOptional()
  desc : string

  @ApiPropertyOptional()
  src : string
}
