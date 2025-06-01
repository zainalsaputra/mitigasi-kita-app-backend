import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string({ required_error: 'Port number is required' }),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_MONGO_URL: z.string({ required_error: 'Db url is required' }),
});

export type EnvConfig = z.infer<typeof envSchema>;
