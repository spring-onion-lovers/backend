import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '../jwt/jwt.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [RecommendationController],
  providers: [
    RecommendationService,
    PrismaService,
    JwtService,
    ProductsService,
  ],
})
export class RecommendationModule {}
