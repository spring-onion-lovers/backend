import * as z from "zod"

export const ProductCategoryModel = z.object({
  category_id: z.number().int(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
