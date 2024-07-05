import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtGuard } from '../jwt/jwt.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserId } from '../user-id/user-id.decorator';
import OKResponse from '../../utilities/OKResponse';

@UseGuards(JwtGuard)
@UsePipes(ZodValidationPipe)
@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@UserId() userId: number, @Body() createCartDto: AddProductToCartDto) {
    try{

      const data = await this.cartService.addProductToCart(userId, createCartDto)
    return new OKResponse(data, 'Product added to cart');
    }catch(e){
      if (e instanceof HttpException){
        throw e;
      }

      throw new InternalServerErrorException('Something Went Wrong');
    }
  }

  @Get()
  async findAll(@UserId() userId: number) {
    // return this.cartService.findAllCartItemsForUser(userId);
    const data = await this.cartService.findAllCartItemsForUser(userId);
    const rtnData = data.map(d => d.Product)
    return new OKResponse(data, 'Cart items retrieved');
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  @Patch(':cart_item_id')
  async update(@Param('cart_item_id') id: string, @UserId() userId: number, @Body() updateCartDto: UpdateCartDto) {
    // return this.cartService.update(userId, +id, updateCartDto);
    const data = await this.cartService.update(userId, +id, updateCartDto)
    return new OKResponse(data, 'Cart item updated');
  }

  @Delete(':cart_item_id')
  async remove(@Param('cart_item_id') id: string, @UserId() userId: number) {
    // return this.cartService.remove(userId, +id);
    try{

    const data = await this.cartService.remove(userId, +id);
      return new OKResponse(
        data,
        'Cart item removed',
      )
    }catch(e){
      throw new InternalServerErrorException(null, 'Cart item can\'t be removed');
    }

  }
}
