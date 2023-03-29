import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { CreatePagePayload } from './payload/create-page.payload';
import { UpdatePagePayload } from './payload/update-page.payload';
import { FindPagePayload } from './payload/find-page.payload';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async create(payload : CreatePagePayload) {
    return this.pageRepository.save(
      this.pageRepository.create(payload))
  }

  async read(payload : FindPagePayload) {
    const db = await this.pageRepository.findOne(payload);
    if(!db) throw new NotFoundException("NotFound")
    return db
  }

  async readMany() {
    return this.pageRepository.find()
  }

  async update({id,...edit} : UpdatePagePayload) {
    const db = await this.pageRepository.findOne(id)
    if(!db) throw new NotFoundException("Cant find page with id " + id)
    Object.entries(edit).forEach(([key,val]) => {
      db[key] = val
    })
    return this.pageRepository.save(db);
  }

  async delete(id : Page["id"]) {
    const db = await this.pageRepository.findOne(id)
    if(!db) throw new NotFoundException("Cant find page with id " + id)
    return this.pageRepository.delete(id);
  }
}
