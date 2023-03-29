import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Page } from '../page.entity';

export class FindGalleryPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  pageId : number
}
