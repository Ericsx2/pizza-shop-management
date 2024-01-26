import { OrderItem } from '../../entities/OrderItem';

export interface IOrderItemsRepository {
  save(orderItem: OrderItem): Promise<void>;
}
