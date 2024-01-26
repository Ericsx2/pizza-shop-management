import { orderItemSchema } from '../../entities/OrderItem';
import { orderSchema } from '../../entities/Order';
import { z } from 'zod';

export const createOrderRequestSchema = orderSchema
  .omit({
    id: true,
    total: true,
    createdAt: true,
  })
  .required()
  .extend({
    products: z.array(
      orderItemSchema.omit({
        id: true,
        orderId: true,
        createdAt: true,
      }),
    ),
  });

export type CreateOrderRequestDTO = z.infer<typeof createOrderRequestSchema>;
