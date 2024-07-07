import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtGuard } from '../jwt/jwt.guard';

@Injectable()
@UseGuards(JwtGuard)
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async getCategories({ query = '' }) {
    return this.prismaService.productCategory.findMany({
      select: {
        name: true,
        category_id: true,
      },
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  async addCategory(data: { name: string }) {
    return this.prismaService.productCategory.create({ data });
  }
}
