import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const userSchema = z.object({
  id: z.string().uuid().optional().readonly(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(['MANAGER', 'WAITER']),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
});

export type UserProps = z.infer<typeof userSchema>;

export class User {
  public readonly id: string | undefined;
  public name: string;
  public username: string;
  public password: string;
  public role: 'MANAGER' | 'WAITER';
  public createdAt: Date | null | undefined;
  public updatedAt: Date | null | undefined;

  constructor(props: UserProps) {
    const { id, name, username, password, role, createdAt, updatedAt } =
      userSchema.parse(props);
    this.id = id ?? uuid();
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
