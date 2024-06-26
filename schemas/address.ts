import * as z from "zod"

export const AddressModel = z.object({
  address_id: z.number().int(),
  user_id: z.number().int().nullish(),
  address_line1: z.string(),
  address_line2: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country_id: z.number().int(),
  building_name: z.string().nullish(),
  building_no: z.string().nullish(),
  remarks: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})
