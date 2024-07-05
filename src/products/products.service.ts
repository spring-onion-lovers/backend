import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
    delete productsOnly['image'];

    return this.prismaService.product.create({
      data: {
        ...productsOnly,
        ProductImage: {
          create: {
            image_url: createProductDto.image_url,
          },
        },
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
        Brand: true,
        ShippingMethod: true,
        Category: true,
        Reviews: {
          include: {
            User: {
              select: {
                username: true,
              }
            }
          }
        },
        ProductImage: true,
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
        Brand: true,
        ShippingMethod: true,
        Category: true,
        Reviews: {
          include: {
            User: {
              select: {
                username: true,
              }
            }
          }
        },
        ProductImage: true,
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
