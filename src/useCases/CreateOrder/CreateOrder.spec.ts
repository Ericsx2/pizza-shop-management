import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { app } from '../../app';
import { faker } from '@faker-js/faker';
import { execSync } from 'child_process';

async function createUser() {
  await request(app)
    .post('/user')
    .set('Accept', 'application/json')
    .send({
      name: faker.person.fullName(),
      username: 'username',
      password: '1234',
    })
    .expect(201);

  const response = await request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send({
      username: 'username',
      password: '1234',
    })
    .expect(200);

  return response.body;
}

describe('Create Order Use Case', () => {
  beforeAll(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
  });

  afterAll(() => {
    execSync('pnpm migrate:rollback');
  });

  let data: any;

  it('Should be able to create a order', async () => {
    data = await createUser();
    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .send({
        total: faker.number.int({ max: 200 }),
        waiterId: data.user_id,
        orderIdentifier: 'Mesa 2',
        observations: 'Sem palmito',
      })
      .expect(201);
  });

  it("Shouldn't able to create order without waiter id", async () => {
    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .send({
        total: faker.number.int({ max: 200 }),
        orderIdentifier: 'Mesa 2',
        observations: 'Sem palmito',
      })
      .expect(400);
  });

  it("Shouldn't able to create order without order identifier", async () => {
    await request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .send({
        total: faker.number.int({ max: 200 }),
        waiterId: data.user_id,
        observations: 'Sem palmito',
      })
      .expect(400);
  });
});
