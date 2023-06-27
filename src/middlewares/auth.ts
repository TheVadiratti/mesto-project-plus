import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import UnauthorizedError from '../services/errors/Unauthorized';
import { SECRET_KEY } from '../utils/constants';
import { UserRequest } from '../types';

export default (req: UserRequest, res: Response, next: NextFunction) => {
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

  req.user = payload as ObjectId;

  next();
};
