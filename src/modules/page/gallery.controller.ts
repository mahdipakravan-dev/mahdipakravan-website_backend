import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryPayload } from './payload/create-gallery.payload';
import { FindGalleryPayload } from './payload/find-gallery.payload';
import { UpdateGalleryPayload } from './payload/update-gallery.payload';
import { DeleteGalleryPayload } from './payload/delete-gallery.payload';

@Controller('api/gallery')
@ApiTags('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
  ) {
  }

  @Post('create')
  async create(@Body() payload: CreateGalleryPayload): Promise<any> {
    return await this.galleryService.create(payload);
  }

  @Get("findByPageId")
  async findByPageId(@Query() query : FindGalleryPayload): Promise<any> {
    return await this.galleryService.read(query);
  }

  @Patch("update")
  async update(@Body() payload : UpdateGalleryPayload): Promise<any> {
    return await this.galleryService.update(payload);
  }

  @Delete("delete")
  async delete(@Query() query : DeleteGalleryPayload): Promise<any> {
    return await this.galleryService.delete(query.id);
  }
}