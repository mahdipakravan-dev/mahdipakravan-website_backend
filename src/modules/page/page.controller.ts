import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageService } from './page.service';
import { CreatePagePayload } from './payload/create-page.payload';
import { Page } from './page.entity';
import { UpdatePagePayload } from './payload/update-page.payload';
import { FindPagePayload } from './payload/find-page.payload';
import responses from './mock/responses';

@Controller('api/page')
@ApiTags('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('create')
  async register(@Body() payload: CreatePagePayload): Promise<any> {
    return await this.pageService.create(payload);
  }

  @Get('findOne')
  async findOne(@Query() query: FindPagePayload): Promise<any> {
    return await this.pageService.read(query);
  }

  @Get('find')
  async find(): Promise<any> {
    return await this.pageService.readMany();
  }

  @Patch('update')
  async update(@Body() payload: UpdatePagePayload): Promise<any> {
    return await this.pageService.update(payload);
  }

  @Delete('delete')
  async delete(@Query() query: FindPagePayload): Promise<any> {
    return await this.pageService.delete(query.id);
  }

  @Get('findMany-mocked')
  findMocked() {
    return responses;
  }
}
