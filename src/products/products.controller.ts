import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'nestjs-zod'
import OKResponse from '../../utilities/OKResponse'
import { JwtGuard } from '../jwt/jwt.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'
import { ProductsService } from './products.service'
import { ReviewService } from '../review/review.service';
import { UserId } from '../user-id/user-id.decorator';
import { CreateReviewDto } from '../review/dto/create-review.dto';

@UsePipes(ZodValidationPipe)
@UseGuards(JwtGuard)
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const res = await this.productsService.create(createProductDto)
    return new OKResponse(res)
  }

  @Get()
  async findAll(@Query() findProductDto: FindProductDto) {
    return new OKResponse(
      await this.productsService.findAll(findProductDto),
      'Products Found',
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.productsService.findOne(+id)
    if (!res) {
      throw new NotFoundException('Product not found')
    }

    return new OKResponse(res)
  }

  @Post(':id/review')
  async createReview(@UserId() userId: number, @Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    const res = await this.reviewService.createReview(userId, createReviewDto)
    return new OKResponse(res)
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
