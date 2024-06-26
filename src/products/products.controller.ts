import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse, { OKResponsePaginated } from '../../utilities/OKResponse';
import { FindProductDto } from './dto/find-product.dto';

@UsePipes(ZodValidationPipe)
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const res = await this.productsService.create(createProductDto);
    return new OKResponse(res);
  }

  @Get()
  async findAll(@Query() findProductDto: FindProductDto) {
    return new OKResponse(
      await this.productsService.findAll(findProductDto),
      'Products Found',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.productsService.findOne(+id);
    if (!res) {
      throw new NotFoundException('Product not found');
    }

    return new OKResponse(res);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
