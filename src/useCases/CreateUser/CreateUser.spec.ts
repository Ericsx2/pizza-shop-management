import request from 'supertest';

import { faker } from '@faker-js/faker';
import { execSync } from 'node:child_process';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../../app';

describe('Create User Use Case', () => {
  beforeEach(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
  });

  it('should be able to create new user', async () => {
    await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        password: '1234',
      })
      .expect(201)
      .then((response) => {
        const { message } = response.body;
        expect(message).toEqual('User created successfully');
      });
  });

  it("shouldn't create user with the same username", async () => {
    const userData = {
      name: faker.person.fullName(),
      username: 'username',
      password: faker.internet.password(),
    };

    await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send(userData)
      .expect(201)
      .then((response) => {
        const { message } = response.body;
        expect(message).toEqual('User created successfully');
      });

    await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send(userData)
      .expect(309)
      .then((response) => {
        const { message } = response.body;
        expect(message).toEqual('User Already Exists');
      });
  });
});
