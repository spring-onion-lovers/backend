import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { JwtService } from '../jwt/jwt.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService, CartService, JwtService],
})
export class PurchaseModule {}
