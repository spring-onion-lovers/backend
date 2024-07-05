import { Injectable, NotFoundException } from '@nestjs/common';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {

  constructor(private prisma: PrismaService) {
  }

  findOneByProductId(user_id: number, product_id: number) {
    return this.prisma.cartItem.findFirst({
      where: {
        user_id,
        product_id
      }
    })
  }


  findOneByCartItemId(user_id: number, cart_item_id: number) {
    return this.prisma.cartItem.findFirst({
      where: {
        user_id,
        cart_item_id
      }
    })
  }


  async addProductToCart(user_id: number, addProductToCartDto: AddProductToCartDto) {
    try {

      const doesExist = await this.findOneByProductId(user_id, addProductToCartDto.product_id)

      if(doesExist){
        return this.update(user_id, doesExist.cart_item_id, {action: 'add', quantity: addProductToCartDto.quantity})
      }


    return await this.prisma.cartItem.create({
      data: {
        user_id,
        product_id: addProductToCartDto.product_id,
        quantity: addProductToCartDto.quantity
      },
    })

    }catch(e){
      throw new NotFoundException('Product not found')
    }
  }

  findAllCartItemsForUser(user_id: number) {
    return this.prisma.cartItem.findMany({
      where: {
        user_id
      },
      select: {
        cart_item_id: true,
        product_id: true,
        quantity: true,
        created_at: true,
        updated_at: true,
        Product: {
          select: {
            product_id: true,
            name: true,
            description: true,
            brand_id: true,
            category_id: true,
            Brand: true,
            price: true,
            stock: true,
            Reviews: {
              include: {
                User: {
                  select: {
                    username: true,
                  }
                }
              }
            },
            created_at: true,
            updated_at: true,
            Category: true,
            ProductImage: true,

          }
        }
      }
    })
  }

  async update(user_id: number, cart_item_id: number, updateCartDto: UpdateCartDto) {

    if (updateCartDto.action === 'add') {
      return this.prisma.cartItem.update({
        where: {
          user_id,
          cart_item_id
        },
        data: {
          quantity: {
            increment: updateCartDto.quantity
          }
        }
      })
    }

    const existingCartItem = await this.findOneByCartItemId(user_id, cart_item_id)

    if(!existingCartItem){
      throw new NotFoundException('Cart item not found')
    }

    if(updateCartDto.quantity > existingCartItem.quantity){
      return await this.remove(user_id, cart_item_id)
    }

    return this.prisma.cartItem.update({
      where: {
        user_id,
        cart_item_id
      },
      data: {
        quantity: {
          decrement: updateCartDto.quantity
        }
      }
    })
  }

  async remove(user_id: number, cart_item_id: number) {
    return this.prisma.cartItem.delete({
      where: {
        user_id,
        cart_item_id
      }
    })
  }
}
