import * as z from "zod"

export const ProductPriceModel = z.object({
  price_id: z.number().int(),
  product_id: z.number().int(),
  country_id: z.number().int(),
  currency: z.string(),
  price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})
