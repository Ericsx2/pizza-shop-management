import { faker } from '@faker-js/faker';
import { Product } from '../../entities/Product';
import { ProductsRepository } from '../../repositories/ProductsRepository';

export function productFactory(quantity: number = 10): Product[] {
  const products: Product[] = [];

  for (let i = 0; i < quantity; i++) {
    products.push(
      new Product({
        name: faker.commerce.productName(),
        isAvailable: true,
        price: faker.number.float({ max: 70, precision: 2 }),
        description: faker.commerce.productDescription(),
      }),
    );
  }

  return products;
}

export default async function seed(): Promise<void> {
  const products = productFactory();
  const productsRepository = new ProductsRepository();
  for (const product of products) {
    await productsRepository.save(product);
  }
}
