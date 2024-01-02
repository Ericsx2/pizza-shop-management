import request from 'supertest';
import { ZodIssue } from 'zod';
import { execSync } from 'child_process';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

describe('Create Product Use Case', () => {
  beforeEach(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
  });

  it('Should to able to create new product', async () => {
    await request('http://localhost:3333')
      .post('/product')
      .set('Accept', 'application/json')
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
    await request('http://localhost:3333')
      .post('/product')
      .set('Accept', 'application/json')
      .send({
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 0.1, max: 100, precision: 2 }),
      })
      .expect(400);
  });

  it("should't create product without price", async () => {
    await request('http://localhost:3333')
      .post('/product')
      .set('Accept', 'application/json')
      .send({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      })
      .expect(400);
  });
});
