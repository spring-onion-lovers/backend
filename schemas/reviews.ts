import * as z from "zod"

export const ReviewsModel = z.object({
  review_id: z.number().int(),
  user_id: z.number().int(),
  product_id: z.number().int(),
  rating: z.number().int(),
  review_text: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
