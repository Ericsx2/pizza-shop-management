import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../env';

interface ITokenPayload {
  name: string;
  username: string;
  id: string;
  role: string;
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).send({ message: 'Token is required' });

  const [, token] = authorization.split(' ');

  try {
    const payload = verify(token, env.JWT_SECRET) as ITokenPayload;

    request.auth = payload;
    next();
  } catch (err) {
    console.log(err);
    return response.status(401).send({ message: 'invalid token' });
  }
}
