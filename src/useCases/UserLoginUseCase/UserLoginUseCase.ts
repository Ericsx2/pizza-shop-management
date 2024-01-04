import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { UserLoginRequestDTO } from './UserLoginDTO';
import { ResponseHandler } from '../../helpers/ResponseHandler';
import { env } from '../../env';

export class UserLoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: UserLoginRequestDTO) {
    try {
      const user = await this.usersRepository.findByUsername(data.username);
      if (!user)
        return ResponseHandler.notFound('Username or password incorrect');

      const passwordMatch = await compare(data.password, user.password);
      if (!passwordMatch)
        return ResponseHandler.notFound('Username or password incorrect');

      const jwtToken = jwt.sign(
        {
          name: user.name,
          username: user.username,
          user_id: user.id,
          role: user.role,
        },
        env.JWT_SECRET,
      );

      return ResponseHandler.success('Login successfully', {
        name: user.name,
        username: user.username,
        user_id: user.id,
        role: user.role,
        token: jwtToken,
      });
    } catch (err) {
      console.log(err);
      return ResponseHandler.internalServerError('Unexpected error');
    }
  }
}
