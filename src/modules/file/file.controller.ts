import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import LocalFilesInterceptor from '../../utils/localFiles.interceptor';

@Controller('api/file')
@ApiTags('File')
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
export class FileController {
  constructor() {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/upload',
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    description:
      'download all files using staticUrl , example : https://URL.com/{staticURL}',
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return `/upload/${file.filename}`
    // return this.alarmService.create({
    //   name: file.originalname,
    //   description: JSON.stringify(file),
    //   staticUrl: `/alarms/${file.filename}`,
    // });
  }
}
