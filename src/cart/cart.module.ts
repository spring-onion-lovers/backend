import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, JwtService, PrismaService],
})
export class CartModule {}
