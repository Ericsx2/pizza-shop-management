import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';

export const userRoleEnum = pgEnum('user_role', ['MANAGER', 'WAITER']);

export const users = pgTable('users', {
  id: uuid('id')
    .$defaultFn(() => v4())
    .primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').default('WAITER').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
