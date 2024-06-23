import { Injectable } from '@nestjs/common';
import OKResponse from '../utilities/OKResponse';

@Injectable()
export class AppService {
  async getHello() {
    return new OKResponse({}, 'Hello World!');
  }
}
