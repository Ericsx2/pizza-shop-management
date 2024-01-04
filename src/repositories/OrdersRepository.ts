import { v4 as uuid } from 'uuid';
import { db } from '../database/connection';
import { Order } from '../entities/Order';
import { IOrdersRepository } from './interfaces/IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  async save(order: Order): Promise<void> {
    if (order.id) {
      await db('orders').where('id', '=', order.id).update({
        observations: order.observations,
        order_identifier: order.orderIdentifier,
        status: order.status,
        total: order.total,
      });
      return;
    }

    await db('orders').insert({
      id: uuid(),
      waiter_id: order.waiterId,
      order_identifier: order.orderIdentifier,
      status: order.status,
      observations: order.observations,
      total: order.total,
      created_at: new Date().toISOString(),
    });
    return;
  }
}
