import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectPayload {
  @ApiPropertyOptional()
  title : string

  @ApiPropertyOptional()
  link : string

  @ApiPropertyOptional()
  stacks : string

  @ApiPropertyOptional()
  sourceCodeUrl : string

  @ApiPropertyOptional()
  demoUrl : string

  @ApiPropertyOptional()
  thumbnail : string
}