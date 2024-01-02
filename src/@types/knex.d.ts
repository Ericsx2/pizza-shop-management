import 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string;
      name: string;
      username: string;
      password: string;
      role: 'MANAGER' | 'WAITER';
      created_at: string;
      updated_at: string;
    };

    products: {
      id: string;
      name: string;
      description: string | null | undefined;
      is_available: boolean;
      price: number;
      image_url: string | null | undefined;
      created_at: string;
      updated_at: string;
    };
  }
}
