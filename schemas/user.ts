import * as z from "zod"

export const UserModel = z.object({
  user_id: z.number().int(),
  username: z.string(),
  email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  country_id: z.number().int(),
})
