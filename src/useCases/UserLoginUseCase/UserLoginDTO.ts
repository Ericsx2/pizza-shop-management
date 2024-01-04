import { z } from 'zod';

export const userLoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserLoginRequestDTO = z.infer<typeof userLoginRequestSchema>;
