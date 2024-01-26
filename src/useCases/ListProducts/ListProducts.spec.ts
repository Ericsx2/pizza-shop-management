import request from 'supertest';
import { execSync } from 'child_process';
import { afterAll, beforeAll, describe, it } from 'vitest';

import { app } from '../../app';
import { getUserToken } from '../../tests/utils/user';

describe('List Products use Case', () => {
  beforeAll(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
    execSync('pnpm db:seed');
  });

  afterAll(() => {
    execSync('pnpm migrate:rollback');
  });

  it('Should be able list all products', async () => {
    const token = await getUserToken();

    await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
