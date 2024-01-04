import { OrdersRepository } from 'src/repositories/OrdersRepository';
import { CreateOrderUseCase } from './CreateOrderUseCase';
import { CreateOrderController } from './CreateOrderController';

const ordersRepository = new OrdersRepository();
const createOrderUseCase = new CreateOrderUseCase(ordersRepository);
export const createOrderController = new CreateOrderController(
  createOrderUseCase,
);
