import { IOrdersRepository } from '../../repositories/interfaces/IOrdersRepository';
import { CreateOrderRequestDTO } from './CreateOrderDto';
import { Order } from '../../entities/Order';
import { ResponseHandler } from '../../helpers/ResponseHandler';

export class CreateOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(data: CreateOrderRequestDTO) {
    try {
      const order = new Order(data);
      await this.ordersRepository.save(order);

      return ResponseHandler.created('Order created successfully');
    } catch (err) {
      console.log(err);
      return ResponseHandler.internalServerError('Unexpected error');
    }
  }
}
