import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactPayload } from './payload/create-contact.payload';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(payload: CreateContactPayload) {
    return this.contactRepository.save(
      this.contactRepository.create({
        ...payload,
      }),
    );
  }

  async find() {
    return this.contactRepository.find();
  }
}
