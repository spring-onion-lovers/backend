import * as z from "zod"

export const InteractionModel = z.object({
  interaction_id: z.number().int(),
  user_id: z.number().int(),
  product_id: z.number().int(),
  interaction: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
