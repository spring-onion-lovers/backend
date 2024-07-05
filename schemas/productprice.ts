import * as z from "zod"

export const ProductPriceModel = z.object({
  price_id: z.number().int(),
  product_id: z.number().int(),
  price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})
