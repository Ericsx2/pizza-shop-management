import request from 'supertest';
import { execSync } from 'child_process';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '../../app';
import { faker } from '@faker-js/faker';

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
}

describe('User Login Use Case', () => {
  beforeAll(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
  });

  afterAll(() => {
    execSync('pnpm migrate:rollback');
  });

  it('Should be able to login after register', async () => {
    await createUser();
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'username',
        password: '1234',
      })
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data).toHaveProperty('user_id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('username');
        expect(data).toHaveProperty('token');
      });
  });

  it("Should't login without username", async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application;json')
      .send({
        username: 'username',
      })
      .expect(400);
  });

  it("Should't login without password", async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application;json')
      .send({
        password: '1234',
      })
      .expect(400);
  });
});
