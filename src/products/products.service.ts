import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindProductDto } from './dto/find-product.dto';
import { omit } from 'lodash';
import { InteractionType } from '../../utilities/interactionType';
import { insertSingleInteractionIntoRecommenderApi } from '../../utilities/bindWithRecomenderApi';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    // const productsOnly: Omit<
    //   CreateProductDto, 'image_url'
    // > = {
    //   ...createProductDto,
    // };

    const productsOnly = omit(createProductDto, ['image_url']);

    return this.prismaService.product.create({
      data: {
        ...productsOnly,
        ProductImage: {
          create: {
            image_url: createProductDto.image_url,
          },
        },
      },
    });
  }

  findAll(query: FindProductDto) {
    return this.prismaService.product.findMany({
      include: {
        Brand: true,
        Category: true,
        Reviews: {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
        ProductImage: true,
      },
      where: {
        price: {
          gte: Number(query.price_low),
          lte: Number(query.price_high),
        },
        OR: [
          {
            name: {
              contains: query.query || '',
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query.query || '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findFromProductIds(product_ids: number[]) {
    return this.prismaService.product.findMany({
      include: {
        Brand: true,
        Category: true,
        Reviews: {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
        ProductImage: true,
      },
      where: {
        product_id: {
          in: product_ids,
        },
        stock: {
          gte: 1,
        },
      },
    });
  }

  async findOne(user_id: number, id: number) {
    // INJECT INTERACTION
    await this.prismaService.interaction.create({
      data: {
        interaction: InteractionType.VIEW,
        product_id: id,
        user_id,
      },
    });

    await insertSingleInteractionIntoRecommenderApi({
      userId: user_id,
      interaction: InteractionType.VIEW,
      productId: id,
    });

    return this.prismaService.product.findFirst({
      include: {
        Brand: true,
        Category: true,
        Reviews: {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
        ProductImage: true,
      },
      where: {
        product_id: id,
        stock: {
          gte: 1,
        },
      },
    });
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
