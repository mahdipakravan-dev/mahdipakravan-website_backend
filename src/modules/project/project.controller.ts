import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@Controller('api/project')
@ApiTags('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {
  }

  // @Post('create')
  // async register(@Body() payload: CreatePagePayload): Promise<any> {
  //   return await this.projectService.create(payload);
  // }
  //
  // @Get("findOne")
  // async findOne(@Query() query : FindPagePayload): Promise<any> {
  //   return await this.projectService.read(query);
  // }
  //
  // @Get("find")
  // async find(): Promise<any> {
  //   return await this.projectService.readMany();
  // }
  //
  // @Patch("update")
  // async update(@Body() payload : UpdatePagePayload): Promise<any> {
  //   return await this.projectService.update(payload);
  // }
  //
  // @Delete("delete")
  // async delete(@Query() query : FindPagePayload): Promise<any> {
  //   return await this.projectService.delete(query.id);
  // }
}