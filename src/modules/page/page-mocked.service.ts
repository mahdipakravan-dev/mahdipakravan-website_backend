import { Injectable } from '@nestjs/common';
import responses from './mock/responses';

@Injectable()
export class PageMockedService {
  constructor() {}

  getMockedResponse() {
    return responses;
  }
}
