import { z } from 'zod'

export const SessionSchema = z.object({
  login: z.string(),
  password: z.string(),
})

export const RegisterSchema = z.object({
  login: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string(),
})

export const RecoveryPasswordSchema = z.object({
  login: z.string(),
})

export const PasswordUpdateSchema = z.object({ password: z.string() })
