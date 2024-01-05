import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { db } from '../connection';

(async () => {
  for (const _ of Array.from({ length: 10 })) {
    await db('products').insert({
      id: uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
  }
  process.exit();
})();
