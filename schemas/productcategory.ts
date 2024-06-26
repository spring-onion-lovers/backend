import * as z from "zod"
import * as imports from "../../prisma/null"

export const ProductCategoryModel = z.object({
  category_id: z.number().int(),
  name: z.string(),
  parent_category_id: z.number().int().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})
