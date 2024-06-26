import * as z from "zod"
import * as imports from "../../prisma/null"

export const ProductAvailabilityModel = z.object({
  availability_id: z.number().int(),
  product_id: z.number().int(),
  country_id: z.number().int(),
  stock: z.number().int(),
  is_available: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
})
