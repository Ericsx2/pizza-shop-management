import { Router } from 'express';
import { listProductsController } from '../useCases/ListProducts';

const listProductsRouter = Router();

listProductsRouter.get('/products', async (request, response) => {
  listProductsController.handle(request, response);
});

export { listProductsRouter };
