import { Request, Response } from 'express';
import { listProductsRequestSchema } from './ListProductsDTO';
import { ListProductsUseCase } from './ListProductsUseCase';

export class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const data = listProductsRequestSchema.parse(request.query);

      const { body, status } = await this.listProductsUseCase.execute(data);

      return response.status(status).send(body);
    } catch (err) {
      console.log(err);

      return response.status(500).send(err);
    }
  }
}
