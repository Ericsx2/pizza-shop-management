import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary();
    table.text('order_identifier').notNullable();
    table.text('observations');
    table
      .enum('status', ['PENDING', 'ONGOING', 'FINISHED'])
      .defaultTo('PENDING');
    table.float('total', 2).notNullable();
    table.uuid('waiter_id').references('users.id');
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
