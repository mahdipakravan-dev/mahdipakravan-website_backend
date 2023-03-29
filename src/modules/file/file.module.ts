import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { FileController } from './file.controller';

@Module({
  imports: [AuthModule],
  exports: [],
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
