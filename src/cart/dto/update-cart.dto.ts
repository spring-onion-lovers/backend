import { PartialType } from '@nestjs/mapped-types';
import { AddProductToCartDto } from './add-product-to-cart.dto';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateCartDto_Schema = z.object({
  action: z.enum(['add', 'remove']),
  quantity: z.coerce.number(),
});


export class UpdateCartDto extends createZodDto(UpdateCartDto_Schema) {}
