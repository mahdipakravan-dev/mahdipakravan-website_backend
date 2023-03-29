import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditProfilePayload {
  @ApiPropertyOptional({})
  username: string;

  @ApiPropertyOptional()
  phoneNumber: string;
}
