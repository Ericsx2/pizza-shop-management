import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: false,
    globalSetup: ['./src/tests/setup.ts'],
  },
});
