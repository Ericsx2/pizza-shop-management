import { db } from '../db/connection';
import { Product } from '../entities/Product';
import { IProductsRepository } from './interfaces/IProductsRepository';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

export class ProductsRepository implements IProductsRepository {
  async save(product: Product): Promise<void> {
    if (product.id) {
      await db
        .update(products)
        .set({
          name: product.name,
          description: product.description,
          isAvailable: product.isAvailable,
          price: product.price,
          imageUrl: product.imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(products.id, products.id));

      return;
    }

    await db.insert(products).values({
      name: product.name,
      description: product.description,
      isAvailable: product.isAvailable,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    return;
  }
}
