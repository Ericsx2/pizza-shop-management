import { Router } from 'express';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { createOrderController } from 'src/useCases/CreateOrder';

const createOrderRouter = Router();

createOrderRouter.post('/order', authMiddleware, async (request, response) => {
  await createOrderController.handle(request, response);
});

export { createOrderRouter };
