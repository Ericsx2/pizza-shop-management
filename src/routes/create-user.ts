import { Router } from 'express';
import { createUserController } from '../useCases/CreateUser';

const createUserRouter = Router();

createUserRouter.post('/user', async (request, response) => {
  await createUserController.handle(request, response);
});

export { createUserRouter };
