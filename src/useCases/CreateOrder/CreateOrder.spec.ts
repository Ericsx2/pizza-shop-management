import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { app } from '../../app';
import { faker } from '@faker-js/faker';
import { execSync } from 'child_process';
import { db } from '../../database/connection';
import { getUser, getUserToken } from '../../tests/utils/user';

describe('Create Order Use Case', () => {
  it('Should be able to create a order', async () => {
    const user = await getUser();

    const products = await db('products').select(['id', 'price']);
    const selectedProducts: any[] = [];
    for (const _ of Array.from({ length: 4 })) {
      selectedProducts.push(faker.helpers.arrayElement(products));
    }

    const token = await getUserToken();

    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        waiterId: user.id,
        orderIdentifier: 'Mesa 2',
        observations: 'Sem palmito',
        products: selectedProducts.map((product) => {
          const quantity = faker.number.int({ max: 4 });
          return {
            productId: product.id,
            quantity,
            total: product.price * quantity,
          };
        }),
      })
      .expect(201);
  });

  it("Shouldn't able to create order without waiter id", async () => {
    const user = await getUser();

    const token = await getUserToken();

    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        total: faker.number.int({ max: 200 }),
        orderIdentifier: 'Mesa 2',
        observations: 'Sem palmito',
      })
      .expect(400);
  });

  it("Shouldn't able to create order without order identifier", async () => {
    const user = await getUser();

    const token = await getUserToken();

    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        total: faker.number.int({ max: 200 }),
        waiterId: user?.id,
        observations: 'Sem palmito',
      })
      .expect(400);
  });
});
