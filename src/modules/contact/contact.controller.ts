import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactPayload } from './payload/create-contact.payload';
import { ContactService } from './contact.service';

@Controller('api/contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('create')
  async create(@Body() payload: CreateContactPayload): Promise<any> {
    return await this.contactService.create(payload);
  }

  @Get('get')
  async get(): Promise<any> {
    return await this.contactService.find();
  }
}
