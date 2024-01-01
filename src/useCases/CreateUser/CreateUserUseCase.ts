import { genSalt, hash } from 'bcrypt';

import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IHttpResponse, ResponseHandler } from '../../helpers/ResponseHandler';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserRequestDTO): Promise<IHttpResponse> {
    try {
      const userAlreadyExists = await this.usersRepository.findByUsername(
        data.username,
      );

      if (userAlreadyExists)
        return ResponseHandler.conflict('User Already Exists');

      const user = new User(data);

      const saltRounds = await genSalt(10);
      const hashedPassword = await hash(user.password, saltRounds);

      user.password = hashedPassword;

      await this.usersRepository.save(user);

      return ResponseHandler.created('User created successfully');
    } catch (error) {
      console.error(error);
      return ResponseHandler.internalServerError('Unexpected Error');
    }
  }
}
