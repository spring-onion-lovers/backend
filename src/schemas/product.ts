import * as z from 'zod';

export const ProductModel = z.object({
  product_id: z.number().int(),
  name: z.string(),
  description: z.string(),
  category_id: z.number().int(),
  brand_id: z.number().int().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
});
