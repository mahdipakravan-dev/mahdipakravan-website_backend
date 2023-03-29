import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Gallery } from './gallery.entity';
import { PageService } from './page.service';
import { GalleryService } from './gallery.service';
import { PageController } from './page.controller';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([Page , Gallery]) , AuthModule],
  controllers : [PageController],
  providers : [
    PageService,
    GalleryService
  ]
})
export class PageModule {}
