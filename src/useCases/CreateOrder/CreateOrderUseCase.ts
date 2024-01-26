import { IOrdersRepository } from '../../repositories/interfaces/IOrdersRepository';
import { CreateOrderRequestDTO } from './CreateOrderDto';
import { Order } from '../../entities/Order';
import { ResponseHandler } from '../../helpers/ResponseHandler';
import { IOrderItemsRepository } from '../../repositories/interfaces/IOrderItemsRepository';
import { OrderItem } from '../../entities/OrderItem';

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private OrderItemsRepository: IOrderItemsRepository,
  ) {}

  async execute(data: CreateOrderRequestDTO) {
    try {
      const { products, orderIdentifier, status, waiterId } = data;

      let total = 0;

      for (const product of products) {
        total += product.total;
      }

      const order = new Order({
        orderIdentifier,
        status,
        waiterId,
        total,
      });

      const savedOrder = await this.ordersRepository.save(order);

      for (const product of products) {
        const orderItem = new OrderItem({
          orderId: savedOrder.id as string,
          quantity: product.quantity,
          total: product.total,
          productId: product.productId,
        });
        await this.OrderItemsRepository.save(orderItem);
      }

      return ResponseHandler.created('Order created successfully');
    } catch (err) {
      console.log(err);
      return ResponseHandler.internalServerError('Unexpected error');
    }
  }
}
