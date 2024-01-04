import { Router } from 'express';
import { createUserController } from '../useCases/CreateUser';

const userRouter = Router();

userRouter.post('/user', async (request, response) => {
  await createUserController.handle(request, response);
});

export { userRouter };
