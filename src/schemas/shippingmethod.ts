import * as z from "zod"
import * as imports from "../../prisma/null"

export const ShippingMethodModel = z.object({
  shipping_method_id: z.number().int(),
  product_id: z.number().int(),
  country_id: z.number().int(),
  shipping_method: z.string(),
  estimated_days: z.number().int(),
  currency: z.string(),
  price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})
