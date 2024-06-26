import * as z from "zod"
import * as imports from "../../prisma/null"

export const PurchaseItemModel = z.object({
  purchase_item_id: z.number().int(),
  purchase_id: z.number().int(),
  product_id: z.number().int(),
  country_id: z.number().int(),
  quantity: z.number().int(),
  price: z.number(),
  stripe_payment_id: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})
