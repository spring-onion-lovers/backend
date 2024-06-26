import * as z from "zod"

export const PurchaseModel = z.object({
  purchase_id: z.number().int(),
  user_id: z.number().int(),
  address_id: z.number().int(),
  shipping_method_id: z.number().int(),
  tax_amount: z.number(),
  total_price: z.number(),
  final_price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  productProduct_id: z.number().int().nullish(),
})
