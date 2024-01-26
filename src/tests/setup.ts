import { execSync } from 'node:child_process';

export async function setup() {
  execSync('pnpm migrate:rollback');
  execSync('pnpm migrate:run');
  execSync('pnpm db:seed');
}

export async function teardown() {
  execSync('pnpm migrate:rollback');
}
