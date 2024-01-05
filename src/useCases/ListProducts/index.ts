import { ProductsRepository } from './../../repositories/ProductsRepository';
import { ListProductsController } from './ListProductsControler';
import { ListProductsUseCase } from './ListProductsUseCase';

const productsRepository = new ProductsRepository();
const listProductsUseCase = new ListProductsUseCase(productsRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export { listProductsController };
