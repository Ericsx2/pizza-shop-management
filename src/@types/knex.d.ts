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

    orders: {
      id: string;
      waiter_id: string;
      order_identifier: string;
      observations: string | undefined | null;
      status: 'PENDING' | 'ONGOING' | 'FINISHED';
      total: number;
      created_at: string;
    };

    order_items: {
      id: string | undefined;
      product_id: string | null;
      order_id: string;
      quantity: number;
      total: number;
      created_at: string | undefined | null;
    };
  }
}
