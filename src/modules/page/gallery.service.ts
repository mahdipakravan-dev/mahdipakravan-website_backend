import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Repository } from 'typeorm';
import { Gallery } from './gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  // async getBy(payload: Partial<Verification>) {
  //   return await this.verificationRepository.findOne(payload);
  // }
  //
  // async create(user: User, action?: VerificationAction) {
  //   return await this.verificationRepository.save(
  //     this.verificationRepository.create({
  //       action: action || VerificationAction.Authentication,
  //       user,
  //     }),
  //   );
  // }
}
