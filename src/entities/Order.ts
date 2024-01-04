import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string().optional(),
  waiterId: z.string(),
  orderIdentifier: z.string(),
  observations: z.string().optional().nullable(),
  status: z.enum(['PENDING', 'ONGOING', 'FINISHED']).default('PENDING'),
  total: z.number(),
  createdAt: z.date().optional().nullable(),
});

export type OrderProps = z.infer<typeof orderSchema>;

export class Order {
  public readonly id: string | undefined;
  public waiterId: string;
  public orderIdentifier: string | undefined | null;
  public observations: string | undefined | null;
  public status: 'PENDING' | 'ONGOING' | 'FINISHED';
  public total: number;
  public createdAt: Date | undefined | null;

  constructor(props: OrderProps) {
    const {
      id,
      waiterId,
      orderIdentifier,
      observations,
      status,
      total,
      createdAt,
    } = orderSchema.parse(props);

    this.id = id;
    this.waiterId = waiterId;
    this.orderIdentifier = orderIdentifier;
    this.observations = observations;
    this.status = status;
    this.total = total;
    this.createdAt = createdAt;
  }
}
