import { Injectable, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { z } from 'zod';
import { ProductModel } from '../../schemas';
import { PrismaService } from '../prisma/prisma.service';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    const productsOnly: Omit<
      CreateProductDto,
      'price' | 'shipping_methods' | 'product_availability'
    > = {
      ...createProductDto,
    };
    delete productsOnly['price'];
    delete productsOnly['shipping_methods'];
    delete productsOnly['product_availability'];

    return this.prismaService.product.create({
      data: {
        ...productsOnly,
        ProductPrice: {
          createMany: {
            data: createProductDto.price,
          },
        },
        ProductAvailability: {
          createMany: {
            data: createProductDto.product_availability,
          },
        },
        ShippingMethod: {
          createMany: {
            data: createProductDto.shipping_methods,
          },
        },
      },
    });
  }

  findAll(query: FindProductDto) {
    return this.prismaService.product.findMany({
      include: {
        Category: true,
        ProductPrice: {
          include: {
            country: true,
          },
        },
        ProductAvailability: {
          include: {
            country: true,
          },
        },
      },
      where: {
        ProductPrice: {
          some: {
            price: {
              gte: Number(query.price_low),
              lte: Number(query.price_high),
            },
          },
        },
        ProductAvailability: {
          some: {
            country_id: {
              equals: 1, // TODO: Replace with user's country
            },
            stock: {
              gt: 0,
            },
            is_available: {
              equals: true,
            },
          },
        },
        OR: [
          {
            name: {
              contains: query.query || '',
            },
          },
          {
            description: {
              contains: query.query || '',
            },
          },
        ],
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findFirst({
      include: {
        Category: true,
        ProductPrice: {
          include: {
            country: true,
          },
        },
        ProductAvailability: {
          include: {
            country: true,
          },
        },
      },
      where: {
        ProductAvailability: {
          some: {
            country_id: {
              equals: 1, // TODO: Replace with user's country
            },
            stock: {
              gt: 0,
            },
            is_available: {
              equals: true,
            },
          },
        },
        product_id: id,
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
