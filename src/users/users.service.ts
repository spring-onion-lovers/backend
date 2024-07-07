import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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

  findByTiktokUserId(tiktokUserId: string) {
    return this.prismaService.user.findFirst({
      where: {
        tiktok_open_id: tiktokUserId,
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

  findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
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
