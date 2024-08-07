import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtService } from '../jwt/jwt.service';

@Module({
  providers: [PrismaService, CategoryService, JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {}
