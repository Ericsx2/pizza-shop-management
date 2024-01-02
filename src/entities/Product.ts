import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  isAvailable: z.boolean().default(true),
  price: z.number(),
  imageUrl: z.string().url().optional().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export type ProductProps = z.infer<typeof productSchema>;

export class Product {
  public readonly id: string | undefined;
  public name: string;
  public description: string | undefined | null;
  public isAvailable: boolean;
  public price: number;
  public imageUrl: string | undefined | null;
  public createdAt: Date | undefined | null;
  public updatedAt: Date | undefined | null;

  constructor(props: ProductProps) {
    const {
      id,
      name,
      description,
      isAvailable,
      price,
      imageUrl,
      createdAt,
      updatedAt,
    } = productSchema.parse(props);

    this.id = id;
    this.name = name;
    this.description = description;
    this.isAvailable = isAvailable;
    this.price = price;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
