import { z } from 'zod';

export const createUserRequestSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(['MANAGER', 'WAITER']).default('WAITER'),
});

export type ICreateUserRequestDTO = z.infer<typeof createUserRequestSchema>;
