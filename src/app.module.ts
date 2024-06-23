import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CategoryService } from './category/category.service';
import { RouterModule } from '@nestjs/core';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoryModule,
    RouterModule.register([
      {
        path: 'category',
        module: CategoryModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
