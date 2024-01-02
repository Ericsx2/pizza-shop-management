import { IProductsRepository } from '../../repositories/interfaces/IProductsRepository';
import { ICreateProductDTO } from './CreateProductDTO';
import { Product } from '../../entities/Product';
import { ResponseHandler } from '../../helpers/ResponseHandler';

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: ICreateProductDTO) {
    try {
      const product = new Product(data);
      await this.productsRepository.save(product);

      return ResponseHandler.created('Product created successfully');
    } catch (err) {
      console.log(err);
      return ResponseHandler.internalServerError('Unexpected Error');
    }
  }
}
