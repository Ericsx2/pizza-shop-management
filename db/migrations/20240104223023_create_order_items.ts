import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_items', (table) => {
    table.uuid('id').primary();
    table.uuid('product_id').references('products.id');
    table.uuid('order_id').references('orders.id');
    table.integer('quantity').notNullable();
    table.float('total', 2).notNullable();
    table.dateTime('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_items');
}
