import { productSchema } from '../../entities/Product';
import { ProductProps } from '../../entities/Product';

export const createProductRequestSchema = productSchema.omit({ id: true });

export type ICreateProductDTO = Omit<
  ProductProps,
  'id' | 'updatedAt' | 'createdAt'
>;
