import { Injectable } from '@nestjs/common';
import responses from './mock/responses';

@Injectable()
export class ProjectMockedService {
  constructor() {}

  getMockedResponse() {
    return responses;
  }
}
