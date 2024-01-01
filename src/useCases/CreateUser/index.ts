import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UsersRepository } from '../../repositories/UsersRepository';

const usersRepository = new UsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
