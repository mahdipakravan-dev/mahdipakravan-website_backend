import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
  ) {}

  // async create(payload : CreatePagePayload) {
  //   return this.pageRepository.save(
  //     this.pageRepository.create(payload))
  // }
  //
  // async read(payload : FindPagePayload) {
  //   const db = await this.pageRepository.findOne(payload);
  //   if(!db) throw new NotFoundException("NotFound")
  //   return db
  // }
  //
  // async readMany() {
  //   return this.pageRepository.find()
  // }
  //
  // async update({id,...edit} : UpdatePagePayload) {
  //   const db = await this.pageRepository.findOne(id)
  //   if(!db) throw new NotFoundException("Cant find page with id " + id)
  //   Object.entries(edit).forEach(([key,val]) => {
  //     db[key] = val
  //   })
  //   return this.pageRepository.save(db);
  // }
  //
  // async delete(id : Page["id"]) {
  //   const db = await this.pageRepository.findOne(id)
  //   if(!db) throw new NotFoundException("Cant find page with id " + id)
  //   return this.pageRepository.delete(id);
  // }
}
