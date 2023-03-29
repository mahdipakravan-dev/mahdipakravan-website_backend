import { PaginatePayload } from '../../common/paginate.payload';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateProjectPayload extends PaginatePayload{
  @ApiPropertyOptional()
  stack:string;
}