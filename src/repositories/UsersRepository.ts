import { v4 as uuid } from 'uuid';
import { User } from '../entities/User';
import { IUsersRepository } from './interfaces/IUsersRepository';
import { db } from '../database/connection';

export class UsersRepository implements IUsersRepository {
  constructor() {}

  async findByUsername(username: string): Promise<User | undefined> {
    const [user] = await db('users').select().where('username', '=', username);

    if (!user) return undefined;

    return new User(user);
  }

  async save(user: User): Promise<void> {
    if (user.id) {
      await db('users').where('id', '=', user.id).update({
        name: user.name,
        username: user.username,
        password: user.password,
        role: user.role,
        updated_at: new Date().toString(),
      });

      return;
    }

    await db('users').insert({
      id: uuid(),
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role,
    });

    return;
  }
}
