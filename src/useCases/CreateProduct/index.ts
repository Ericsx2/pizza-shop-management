import { ProductsRepository } from '../../repositories/ProductsRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductController } from './CreateProductController';

const productsRepository = new ProductsRepository();
const createProductUseCase = new CreateProductUseCase(productsRepository);
const createProductController = new CreateProductController(
  createProductUseCase,
);

export { createProductController };
