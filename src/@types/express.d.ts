declare namespace Express {
  export interface Request {
    auth?: {
      name: string;
      username: string;
      id: string;
      role: string;
    };
  }
}
