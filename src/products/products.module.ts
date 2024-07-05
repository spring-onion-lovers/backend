import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';
import { ReviewService } from '../review/review.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, JwtService, ReviewService],
})
export class ProductsModule {}
