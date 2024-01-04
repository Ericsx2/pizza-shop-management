import { userLoginController } from '../useCases/UserLogin';
import { Router } from 'express';

const userLoginRouter = Router();

userLoginRouter.post('/auth/login', async (request, response) => {
  await userLoginController.handle(request, response);
});

export { userLoginRouter };
