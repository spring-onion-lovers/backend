import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [PrismaService, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
