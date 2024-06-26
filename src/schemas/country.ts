import * as z from "zod"
import * as imports from "../../prisma/null"

export const CountryModel = z.object({
  country_id: z.number().int(),
  country_code: z.string(),
  country_name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
