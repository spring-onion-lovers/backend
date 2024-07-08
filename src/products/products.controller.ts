import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse from '../../utilities/OKResponse';
import { JwtGuard } from '../jwt/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductsService } from './products.service';
import { ReviewService } from '../review/review.service';
import { UserId } from '../user-id/user-id.decorator';
import { CreateReviewDto } from '../review/dto/create-review.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@UsePipes(ZodValidationPipe)
@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewService: ReviewService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const res = await this.productsService.create(createProductDto);
    return new OKResponse(res);
  }

  @Get()
  async findAll(@Query() findProductDto: FindProductDto) {
    console.log(findProductDto);
    const data = await this.productsService.findAll(findProductDto);
    console.log(data);
    return new OKResponse(data, 'Products Found');
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@UserId() userId: number, @Param('id') id: string) {
    const res = await this.productsService.findOne(userId, +id);
    if (!res) {
      throw new NotFoundException('Product not found');
    }

    return new OKResponse(res);
  }

  @Post(':id/review')
  @UseGuards(JwtGuard)
  async createReview(
    @UserId() userId: number,
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      const res = await this.reviewService.createReview(
        userId,
        +id,
        createReviewDto,
      );
      return new OKResponse(res);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      if (e instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('Product not found');
      }

      throw new HttpException(
        'An error occurred while creating the review',
        500,
      );
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
