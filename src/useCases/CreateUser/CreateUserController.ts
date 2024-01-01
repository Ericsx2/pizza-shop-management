import { ZodError } from 'zod';
import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { createUserRequestSchema } from './CreateUserDTO';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = createUserRequestSchema.parse(request.body);

      console.log(this);

      const { message, status } = await this.createUserUseCase.execute(data);

      return response.status(status).json({ message });
    } catch (err) {
      console.log(err);
      if (err instanceof ZodError) {
        return response.status(400).send(err);
      }

      return response.status(500).send(err);
    }
  }
}
