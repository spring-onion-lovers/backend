import * as z from "zod"

export const ProductImageModel = z.object({
  product_image_id: z.number().int(),
  product_id: z.number().int(),
  image_url: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
