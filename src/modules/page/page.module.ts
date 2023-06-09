import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Gallery } from './gallery.entity';
import { PageService } from './page.service';
import { GalleryService } from './gallery.service';
import { PageController } from './page.controller';
import { AuthModule } from '../auth';
import { GalleryController } from './gallery.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Gallery]), AuthModule],
  controllers: [PageController, GalleryController],
  providers: [PageService, GalleryService],
})
export class PageModule {}
