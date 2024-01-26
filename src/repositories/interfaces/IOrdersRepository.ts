import { Order } from '../../entities/Order';

export interface IOrdersRepository {
  save(order: Order): Promise<Order>;
}
