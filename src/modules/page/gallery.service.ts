import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Repository } from 'typeorm';
import { Gallery } from './gallery.entity';
import { CreateGalleryPayload } from './payload/create-gallery.payload';
import { FindGalleryPayload } from './payload/find-gallery.payload';
import { UpdateGalleryPayload } from './payload/update-gallery.payload';
import { PageService } from './page.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly pageService: PageService,
  ) {}

  async create(payload : CreateGalleryPayload) {
    const page = await this.pageService.read({id : payload.pageId})
    if(!page) throw new NotFoundException("No page found with this pageId")
    return this.galleryRepository.save(
      this.galleryRepository.create({
        ...payload,
        page
      }))
  }

  async read(payload : FindGalleryPayload) {
    const page = await this.pageService.read({ id : payload.pageId });
    if(!payload) throw new NotFoundException("Page Not Founded")
    const db = await this.galleryRepository.find({where : {
      page
    }});
    if(!db) throw new NotFoundException("Gallery NotFound")
    return db
  }

  async readMany() {
    return this.galleryRepository.find()
  }

  async update({id,...edit} : UpdateGalleryPayload) {
    const db = await this.galleryRepository.findOne(id)
    if(!db) throw new NotFoundException("Cant find page with id " + id)
    Object.entries(edit).forEach(([key,val]) => {
      db[key] = val
    })
    return this.galleryRepository.save(db);
  }

  async delete(id : Page["id"]) {
    const db = await this.galleryRepository.findOne(id)
    if(!db) throw new NotFoundException("Cant find page with id " + id)
    return this.galleryRepository.delete(id);
  }
}
