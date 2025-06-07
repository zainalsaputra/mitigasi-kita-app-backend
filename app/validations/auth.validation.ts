import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export const refreshTokenSchema = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export const forgotPasswordSchema = z.object({
  email: z.string().email()
}).strict();

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8)
}).strict();
