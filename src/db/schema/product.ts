import {
  boolean,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';

export const products = pgTable('products', {
  id: uuid('id')
    .$defaultFn(() => v4())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isAvailable: boolean('is_available').default(true),
  price: real('price').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
