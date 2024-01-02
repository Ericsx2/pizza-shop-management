import { db } from '../database/connection';
import { Product } from '../entities/Product';
import { IProductsRepository } from './interfaces/IProductsRepository';

export class ProductsRepository implements IProductsRepository {
  async save(product: Product): Promise<void> {
    if (product.id) {
      await db('products').where('id', '=', product.id).update({
        name: product.name,
        description: product.description,
        is_available: product.isAvailable,
        price: product.price,
        image_url: product.imageUrl,
        updated_at: new Date().toString(),
      });

      return;
    }

    await db('products').insert({
      name: product.name,
      description: product.description,
      is_available: product.isAvailable,
      price: product.price,
      image_url: product.imageUrl,
    });

    return;
  }
}
