import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectPayload {
  @ApiProperty()
  id: number;
}
