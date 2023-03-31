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
import { ProjectService } from './project.service';
import { CreateProjectPayload } from './payload/create-project.payload';
import { FindProjectPayload } from './payload/find-project.payload';
import { PaginateProjectPayload } from './payload/paginate-project.payload';
import { UpdateProjectPayload } from './payload/update-project.payload';
import { DeleteProjectPayload } from './payload/delete-project.payload';
import { ProjectMockedService } from './project-mock.service';

@Controller('api/project')
@ApiTags('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectMockedService: ProjectMockedService,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateProjectPayload): Promise<any> {
    return await this.projectService.create(payload);
  }

  @Get('findOne')
  async findOne(@Query() query: FindProjectPayload): Promise<any> {
    return await this.projectService.read(query);
  }

  @Get('paginate')
  async paginate(@Query() options: PaginateProjectPayload): Promise<any> {
    return await this.projectService.readMany(options);
  }

  @Patch('update')
  async update(@Body() payload: UpdateProjectPayload): Promise<any> {
    return await this.projectService.update(payload);
  }

  @Delete('delete')
  async delete(@Query() query: DeleteProjectPayload): Promise<any> {
    return await this.projectService.delete(query);
  }

  @Get('find-projects')
  async findMockedProject() {
    return this.projectMockedService.getMockedResponse();
  }
}
