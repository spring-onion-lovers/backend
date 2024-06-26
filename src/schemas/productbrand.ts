import * as z from "zod"
import * as imports from "../../prisma/null"

export const ProductBrandModel = z.object({
  brand_id: z.number().int(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
