import { Product } from '../../entities/Product';

export interface IProductsRepository {
  save(product: Product): Promise<void>;
}
