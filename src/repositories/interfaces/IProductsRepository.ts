import { Product } from '../../entities/Product';
import { IRepositoryOptions } from './IRepositoryOptions';

export interface IProductsRepository {
  findAll(options: IRepositoryOptions): Promise<Product[]>;
  save(product: Product): Promise<void>;
}
