import request from 'supertest';
import { execSync } from 'child_process';
import { afterAll, beforeAll, describe, it } from 'vitest';

import { app } from '../../app';

describe('List Products use Case', () => {
  beforeAll(() => {
    execSync('pnpm migrate:rollback');
    execSync('pnpm migrate:run');
    execSync('pnpm tsnd src/database/seeders/Product.ts');
  });

  afterAll(() => {
    execSync('pnpm migrate:rollback');
  });

  it('Should be able list all products', async () => {
    await request(app).get('/products').expect(200);
  });
});
