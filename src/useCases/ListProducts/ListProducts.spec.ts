import request from 'supertest';
import { describe, it } from 'vitest';

import { app } from '../../app';
import { getUserToken } from '../../tests/utils/user';

describe('List Products use Case', () => {
  it('Should be able list all products', async () => {
    const token = await getUserToken();

    await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
