import { z } from 'zod';

export const listProductsRequestSchema = z.object({
  orderBy: z.enum(['name', 'is_available']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
  offset: z.number().default(10),
  limit: z.number().default(10),
  page: z.number().default(1),
});

export type ListProductsRequestDTO = z.infer<typeof listProductsRequestSchema>;
