import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app';
import { getUser } from '../../tests/utils/user';

describe('User Login Use Case', () => {
  it('Should be able to login after register', async () => {
    const user = await getUser();
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: user.username,
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

  it("Should't login without password", async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application;json')
      .send({
        username: 'username',
      })
      .expect(400);
  });

  it("Should't login without username", async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application;json')
      .send({
        password: '1234',
      })
      .expect(400);
  });
});
