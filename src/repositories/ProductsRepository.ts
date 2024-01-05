import { v4 as uuid } from 'uuid';
import { db } from '../database/connection';
import { Product } from '../entities/Product';
import { IProductsRepository } from './interfaces/IProductsRepository';
import { IRepositoryOptions } from './interfaces/IRepositoryOptions';

export class ProductsRepository implements IProductsRepository {
  async findAll({
    orderBy = '',
    limit = 10,
    offset = 10,
    page = 1,
  }: IRepositoryOptions): Promise<Product[]> {
    const products: Product[] = [];
    const data = await db
      .select('*')
      .from('products')
      .orderBy(orderBy)
      .limit(limit)
      .offset(page * offset - offset);

    for (const product of data) {
      products.push(
        new Product({
          isAvailable: product.is_available,
          imageUrl: product.image_url,
          createdAt: new Date(product.created_at),
          updatedAt: new Date(product.updated_at),
          ...product,
        }),
      );
    }

    return products;
  }

  async save(product: Product): Promise<void> {
    if (product.id) {
      await db('products').where('id', '=', product.id).update({
        name: product.name,
        description: product.description,
        is_available: product.isAvailable,
        price: product.price,
        image_url: product.imageUrl,
        updated_at: new Date().toISOString(),
      });

      return;
    }

    await db('products').insert({
      id: uuid(),
      name: product.name,
      description: product.description,
      is_available: product.isAvailable,
      price: product.price,
      image_url: product.imageUrl,
    });

    return;
  }
}
