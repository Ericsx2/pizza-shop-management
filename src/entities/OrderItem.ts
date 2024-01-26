import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional().nullable(),
  orderId: z.string(),
  quantity: z.number().default(1),
  total: z.number(),
  createdAt: z.date().optional().nullable(),
});

export type OrderItemProps = z.infer<typeof orderItemSchema>;

export class OrderItem {
  public id: string | undefined;
  public productId: string | undefined | null;
  public orderId: string;
  public quantity: number;
  public total: number;
  public createdAt: Date | undefined | null;

  constructor(props: OrderItemProps) {
    const { id, productId, orderId, quantity, total, createdAt } =
      orderItemSchema.parse(props);

    this.id = id;
    this.productId = productId;
    this.orderId = orderId;
    this.quantity = quantity;
    this.total = total;
    this.createdAt = createdAt;
  }
}
