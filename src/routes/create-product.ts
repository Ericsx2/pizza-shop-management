import { Router } from 'express';
import { createProductController } from '../useCases/CreateProduct';

const createProductRouter = Router();

createProductRouter.post('/product', async (request, response) => {
  await createProductController.handle(request, response);
});

export { createProductRouter };
