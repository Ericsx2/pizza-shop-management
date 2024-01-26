import request from 'supertest';

import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { app } from '../../app';
import { getUser } from '../../tests/utils/user';

describe('Create User Use Case', () => {
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
    const user = await getUser();

    const userData = {
      name: faker.person.fullName(),
      username: user.username,
      password: faker.internet.password(),
    };

    await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send(userData)
      .expect(309)
      .then((response) => {
        const { message } = response.body;
        expect(message).toEqual('User Already Exists');
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
