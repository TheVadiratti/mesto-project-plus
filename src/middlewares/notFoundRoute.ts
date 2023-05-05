import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../services/errors/NotFound';

export default (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Запрос на несуществующий маршрут.'));
};
