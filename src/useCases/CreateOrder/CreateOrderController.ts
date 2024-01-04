import { Request, Response } from 'express';
import { CreateOrderUseCase } from './CreateOrderUseCase';
import { createOrderRequestSchema } from './CreateOrderDto';
import { ZodError } from 'zod';

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data = createOrderRequestSchema.parse(request.body);

      const { body, status } = await this.createOrderUseCase.execute(data);

      return response.status(status).json(body);
    } catch (err) {
      console.log(err);
      if (err instanceof ZodError) {
        return response.status(400).send(err);
      }

      return response.status(500).send(err);
    }
  }
}
