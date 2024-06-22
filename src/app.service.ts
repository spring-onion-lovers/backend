import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getHello() {
    return {
      message:
        'Hello World! If you see the env values, this app was set up correctly. Each refresh will add a user to the list below. Look at `getUsers`.',

      date: new Date().toISOString(),
      envExists: Object.keys(process.env).length > 0,
      users: await this.getUsers(),
    };
  }

  async getUsers() {
    await this.prismaService.user.create({
      data: {
        email: `johndoe-${Math.random()}@email.com`,
        name: 'John Doe',
      },
    });

    return this.prismaService.user.findMany();
  }
}
