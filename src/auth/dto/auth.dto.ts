import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class LoginAuthDto extends createZodDto(LoginSchema) {}

export class SignUpAuthDto extends createZodDto(SignUpSchema) {}
