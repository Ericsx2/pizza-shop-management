import { Request, Response } from 'express';
import { UserLoginUseCase } from './UserLoginUseCase';
import { userLoginRequestSchema } from './UserLoginDTO';
import { ZodError } from 'zod';

export class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data = userLoginRequestSchema.parse(request.body);

      const { body, status } = await this.userLoginUseCase.execute(data);

      return response.status(status).send(body);
    } catch (err) {
      console.log(err);
      if (err instanceof ZodError) {
        return response.status(400).send(err);
      }

      return response.status(500).send(err);
    }
  }
}
