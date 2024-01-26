import { OrdersRepository } from 'src/repositories/OrdersRepository';
import { CreateOrderUseCase } from './CreateOrderUseCase';
import { CreateOrderController } from './CreateOrderController';
import { OrderItemsRepository } from 'src/repositories/OrderItemsRepository';

const ordersRepository = new OrdersRepository();
const orderItemsRepository = new OrderItemsRepository();
const createOrderUseCase = new CreateOrderUseCase(
  ordersRepository,
  orderItemsRepository,
);
export const createOrderController = new CreateOrderController(
  createOrderUseCase,
);
