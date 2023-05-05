import { Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import User from '../models/user';
import { UserRequest } from '../types';
import IncorrectDataError from '../services/errors/IncorrectData';
import NotFoundError from '../services/errors/NotFound';

const setProfileData = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
  data: object,
) => User.findByIdAndUpdate(
  req.user,
  data,
  { new: true, runValidators: true },
).orFail()
  .then((me) => res.send(me))
  .catch((err) => {
    if (err instanceof Error.ValidationError) {
      next(new IncorrectDataError('Переданы некорректные данные при обновлении профиля.'));
    } else if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь с указанным ID не найден.'));
    } else if (err instanceof Error.CastError) {
      next(new IncorrectDataError('Передан невалидный ID.'));
    } else {
      next(err);
    }
  });

export default setProfileData;
