import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../services/errors/constants';
import { SECRET_KEY } from '../utils/constants';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const error = 'Необходима авторизация.';

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(error));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(error));
  }

  req.body.user = payload;

  next();
  return null;
};
