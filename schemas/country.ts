import * as z from "zod"

export const CountryModel = z.object({
  country_id: z.number().int(),
  country_code: z.string(),
  country_name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
