import { IProductsRepository } from '../../repositories/interfaces/IProductsRepository';
import { ResponseHandler } from '../../helpers/ResponseHandler';
import { ListProductsRequestDTO } from './ListProductsDTO';

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: ListProductsRequestDTO) {
    try {
      const products = await this.productsRepository.findAll(data);

      return ResponseHandler.success('List', { data: products });
    } catch (err) {
      console.log(err);
      return ResponseHandler.internalServerError('Unexpected Error');
    }
  }
}
