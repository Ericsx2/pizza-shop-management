import { Router } from 'express';
import { listProductsController } from '../useCases/ListProducts';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const listProductsRouter = Router();

listProductsRouter.get(
  '/products',
  authMiddleware,
  async (request, response) => {
    listProductsController.handle(request, response);
  },
);

export { listProductsRouter };
