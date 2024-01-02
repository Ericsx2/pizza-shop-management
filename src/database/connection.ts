import { Knex, knex as setupConfig } from 'knex';
import { env } from '../env';

export const config: Knex.Config = {
  client: 'pg',
  connection: env.DB_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const db = setupConfig(config);
