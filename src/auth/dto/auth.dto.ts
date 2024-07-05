import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const TokenExchangeSchema = z.object({
  code: z.string(),
  code_verifier: z.string(),
  redirect_uri: z.string(),
});

export class TokenExchangeDto extends createZodDto(TokenExchangeSchema) {}

export class LoginAuthDto extends createZodDto(LoginSchema) {}

export class SignUpAuthDto extends createZodDto(SignUpSchema) {}
