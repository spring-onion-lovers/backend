import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from '../products/dto/create-product.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const userOnly: Omit<CreateUserDto, 'address'> = { ...createUserDto };
    delete userOnly['address'];

    return this.prismaService.user.create({
      data: {
        ...userOnly,
        Address: {
          create: createUserDto.address,
        },
      },
    });
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        user_id: id,
      },
      include: {
        Address: {
          include: {
            country: true,
          },
        },
        country: true,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
