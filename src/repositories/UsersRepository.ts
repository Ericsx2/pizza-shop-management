import { User } from '../entities/User';
import { IUsersRepository } from './interfaces/IUsersRepository';
import { IHttpResponse, ResponseHandler } from '../helpers/ResponseHandler';
import { db } from '../db/connection';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export class UsersRepository implements IUsersRepository {
  constructor() {}

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) return undefined;

    return new User(user);
  }

  async save(user: User): Promise<void> {
    const userAlreadyExists = await this.findByUsername(user.username);

    if (userAlreadyExists) {
      await db
        .update(users)
        .set({
          name: user.name,
          username: user.username,
          password: user.password,
          updatedAt: new Date(),
          role: user.role,
        })
        .where(eq(users.username, user.username));

      return;
    }

    await db.insert(users).values({
      id: user.id as string,
      name: user.name,
      username: user.username,
      password: user.password,
      updatedAt: new Date(),
      createdAt: user.createdAt,
      role: user.role,
    });

    return;
  }
}
