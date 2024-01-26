import request from 'supertest';
import { db } from '../../database/connection';
import { app } from '../../app';

export async function getUser() {
  const user = await db('users').where('role', '=', 'WAITER').first();

  return user;
}

export async function getUserToken() {
  const user = await getUser();

  const response = await request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send({
      username: user?.username,
      password: '1234',
    });

  return response.body.token;
}
