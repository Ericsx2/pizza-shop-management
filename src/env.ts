import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.string(),
  DB_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
