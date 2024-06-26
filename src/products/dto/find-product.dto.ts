import { createZodDto } from 'nestjs-zod';
import {
  ProductAvailabilityModel,
  ProductModel,
  ProductPriceModel,
  ShippingMethodModel,
} from '../../../schemas';
import { z } from 'zod';

const FindProductSchema = z.object({
  query: z.string().optional(),
  price_low: z.coerce.number().positive().default(1),
  price_high: z.coerce.number().positive().default(1000000),
  page: z.coerce.number().int().default(1),
});

export class FindProductDto extends createZodDto(FindProductSchema) {}
