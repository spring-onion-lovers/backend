import * as z from "zod"
import * as imports from "../../prisma/null"

export const UserModel = z.object({
  user_id: z.number().int(),
  username: z.string(),
  email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  country_id: z.number().int(),
})
