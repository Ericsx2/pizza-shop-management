import { Router } from 'express';
import { createProductController } from '../useCases/CreateProduct';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const createProductRouter = Router();

createProductRouter.post(
  '/product',
  authMiddleware,
  async (request, response) => {
    await createProductController.handle(request, response);
  },
);

export { createProductRouter };
