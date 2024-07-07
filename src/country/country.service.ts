import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.country.findMany({
      select: {
        country_id: true,
        country_code: true,
        country_name: true,
      },
    });
  }
}
