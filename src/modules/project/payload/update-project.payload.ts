import { CreateProjectPayload } from './create-project.payload';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectPayload extends CreateProjectPayload {
  @ApiProperty()
  id: number;
}
