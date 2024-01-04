import { orderSchema } from '../../entities/Order';
import { z } from 'zod';

export const createOrderRequestSchema = orderSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateOrderRequestDTO = z.infer<typeof createOrderRequestSchema>;
