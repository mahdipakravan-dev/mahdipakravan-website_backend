import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectPayload } from './payload/create-project.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user';
import { Like, Not, Repository } from 'typeorm';
import { Project } from './project.entity';
import { FindProjectPayload } from './payload/find-project.payload';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateProjectPayload } from './payload/paginate-project.payload';
import { UpdateProjectPayload } from './payload/update-project.payload';
import { Page } from '../page';
import { DeleteProjectPayload } from './payload/delete-project.payload';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(payload: CreateProjectPayload) {
    return this.projectRepository.save(this.projectRepository.create(payload));
  }

  async read(payload: FindProjectPayload) {
    const db = await this.projectRepository.findOne(payload);
    if (!db) throw new NotFoundException('NotFound');
    return db;
  }

  async readMany({ stack, ...options }: PaginateProjectPayload) {
    if (!stack) return paginate<Project>(this.projectRepository, options);
    const stacks = stack.split(',');
    if (stacks.length === 1)
      return paginate<Project>(this.projectRepository, options, {
        where: {
          stacks: Like(`%${stacks[0]}%`),
        },
      });
    const queries = await Promise.all(
      stacks.map((qStack) => {
        return paginate<Project>(this.projectRepository, options, {
          where: {
            stacks: Like(`%${qStack}%`),
          },
        }).then((res) => res.items);
      }),
    );
    const finalArray = [];
    queries.map((arr) => arr.forEach((item) => finalArray.push(item)));
    return {
      items: finalArray,
    };
  }

  async update({ id, ...edit }: UpdateProjectPayload) {
    const db = await this.projectRepository.findOne(id);
    if (!db) throw new NotFoundException('Cant find page with id ' + id);
    Object.entries(edit).forEach(([key, val]) => {
      db[key] = val;
    });
    return this.projectRepository.save(db);
  }

  async delete({ id }: DeleteProjectPayload) {
    const db = await this.projectRepository.findOne(id);
    if (!db) throw new NotFoundException('Cant find project with id ' + id);
    return this.projectRepository.delete(id);
  }
}
