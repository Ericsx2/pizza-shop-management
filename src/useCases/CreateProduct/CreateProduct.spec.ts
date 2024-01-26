import request from 'supertest';
import { execSync } from 'child_process';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { app } from '../../app';
import { getUserToken } from '../../tests/utils/user';

describe('Create Product Use Case', () => {
  beforeAll(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
    execSync('pnpm db:seed');
  });

  afterAll(() => {
    execSync('pnpm migrate:rollback');
  });

  it('Should to able to create new product', async () => {
    const token = await getUserToken();

    await request(app)
      .post('/product')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 0.1, max: 100, precision: 2 }),
      })
      .expect(201)
      .then((response) => {
        const { message } = response.body;
        expect(message).toEqual('Product created successfully');
      });
  });

  it("should't create product without name", async () => {
    const token = await getUserToken();

    await request(app)
      .post('/product')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 0.1, max: 100, precision: 2 }),
      })
      .expect(400);
  });

  it("should't create product without price", async () => {
    const token = await getUserToken();

    await request(app)
      .post('/product')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      })
      .expect(400);
  });
});
