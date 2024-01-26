import { faker } from '@faker-js/faker';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';
import { hashSync } from 'bcrypt';

export function userFactory(quantity: number = 10): User[] {
  const users: User[] = [];

  for (let i = 0; i < quantity; i++) {
    users.push(
      new User({
        name: faker.person.fullName(),
        password: hashSync('1234', 10),
        role: faker.helpers.arrayElement(['MANAGER', 'WAITER']),
        username: faker.internet.userName(),
      }),
    );
  }

  return users;
}

export default async function seed(): Promise<void> {
  const users = userFactory();
  const usersRepository = new UsersRepository();
  for (const user of users) {
    await usersRepository.save(user);
  }
}
