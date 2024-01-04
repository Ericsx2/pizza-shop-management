import { Router } from 'express';
import { createOrderController } from 'src/useCases/CreateOrder';

const createOrderRouter = Router();

createOrderRouter.post('/order', async (request, response) => {
  await createOrderController.handle(request, response);
});

export { createOrderRouter };
