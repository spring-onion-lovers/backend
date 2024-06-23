import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import OKResponse from '../../utilities/OKResponse';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    const data = await this.categoryService.getCategories({ query: undefined });
    return new OKResponse(data);
  }

  @Post()
  async createCategory(@Body() body: { name: string }) {
    const data = await this.categoryService.addCategory({ name: body.name });

    return new OKResponse(data, 'Category created successfully!', 201);
  }
}
