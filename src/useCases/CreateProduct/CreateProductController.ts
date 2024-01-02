import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';
import { createProductRequestSchema } from './CreateProductDTO';
import { ZodError } from 'zod';

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: Request, response: Response) {
    console.log(request.body);
    try {
      const data = createProductRequestSchema.parse(request.body);

      const { message, status } = await this.createProductUseCase.execute(data);

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
