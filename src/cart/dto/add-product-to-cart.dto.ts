import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const AddProductToCartDto_Schema = z.object({
  product_id: z.coerce.number(),
  quantity: z.coerce.number(),
})

export class AddProductToCartDto extends createZodDto(AddProductToCartDto_Schema) {}
