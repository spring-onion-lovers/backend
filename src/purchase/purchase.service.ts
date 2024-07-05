import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class PurchaseService {

  constructor(private prisma: PrismaService, private cartService: CartService) {}

  async initiatePurchase(user_id:number, createPurchaseDto: CreatePurchaseDto) {
    const cartItems = await this.cartService.findCartItemsByCartItemIds(user_id, createPurchaseDto.cart_item_ids)


    if(!cartItems || cartItems.length === 0){
      throw new NotFoundException('Cart items not found. Cannot initiate purchase.')
    }

    const totalAmount = cartItems.reduce((previousValue, currentValue) => {
      return currentValue.Product.price * currentValue.quantity
    }, 0)

    return this.prisma.$transaction(async (tx) => {
      await tx.purchase.create({
        data: {
          tax_amount: totalAmount * 0.07,
          total_price: totalAmount,
          final_price: totalAmount * 1.07,
          address_id: createPurchaseDto.address_id,
          user_id: user_id,

          PurchaseItem: {
            createMany: {
              data: cartItems.map(cartItem => {
                return {
                  quantity: cartItem.quantity,
                  price: cartItem.Product.price,
                  product_id: cartItem.product_id
                }
              })
            }
          }
        }
      })

    })
  }

  findAllPurchases(user_id: number) {
    return this.prisma.purchase.findMany({
      where: {user_id},
      include: {
        PurchaseItem: {
          include: {
            Product: true
          }
        }
      }
    })
  }

  findOne(user_id: number, id: number) {
    return this.prisma.purchase.findFirst({
      where: {user_id, purchase_id: id},
      include: {
        PurchaseItem: {
          include: {
            Product: true
          }
        }
      }
    })
  }

  // update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} purchase`;
  // }
}
