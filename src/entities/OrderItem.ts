import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string(),
  productId: z.string().optional().nullable(),
  quantity: z.number().default(1),
  total: z.number(),
  createdAt: z.date().optional().nullable(),
});

export type OrderItemProps = z.infer<typeof orderItemSchema>;

export class OrderItem {
  public id: string;
  public productId: string | undefined | null;
  public quantity: number;
  public total: number;
  public createdAt: Date | undefined | null;

  constructor(props: OrderItemProps) {
    const { id, productId, quantity, total, createdAt } =
      orderItemSchema.parse(props);

    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.total = total;
    this.createdAt = createdAt;
  }
}
