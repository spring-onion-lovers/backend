import { createZodDto } from 'nestjs-zod';
import {
  ProductModel,
} from '../../../schemas';
import { z } from 'zod';

const CreateProductSchema = ProductModel.omit({
  product_id: true,
  created_at: true,
  updated_at: true,
}).extend({
  image_url: z.string(),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().positive(),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {}
