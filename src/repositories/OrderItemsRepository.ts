import { v4 as uuid } from 'uuid';
import { OrderItem } from '../entities/OrderItem';
import { IOrderItemsRepository } from './interfaces/IOrderItemsRepository';
import { db } from '../database/connection';

export class OrderItemsRepository implements IOrderItemsRepository {
  async save(orderItem: OrderItem): Promise<void> {
    await db('order_items').insert({
      id: uuid(),
      product_id: orderItem.productId,
      order_id: orderItem.orderId,
      quantity: orderItem.quantity,
      total: orderItem.total,
    });
  }
}
