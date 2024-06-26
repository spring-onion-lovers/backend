import * as z from "zod"

export const CartItemModel = z.object({
  cart_item_id: z.number().int(),
  user_id: z.number().int(),
  product_id: z.number().int(),
  quantity: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
})
