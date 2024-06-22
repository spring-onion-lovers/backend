import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message:
        'Hello World! If you see the env values, this app was set up correctly.',
      date: new Date().toISOString(),
      env: JSON.parse(JSON.stringify(process.env || '{}')),
    };
  }
}
