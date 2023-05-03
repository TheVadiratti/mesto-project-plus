import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { IncorrectDataError, NotFoundError } from '../services/errors';

const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
    } else {
      next(err);
    }
  });

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return User.create({
    name,
    about,
    avatar,
    email,
    password,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.body.user._id,
    { name, about },
    { new: true },
  )
    .then((me) => res.send(me))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении профиля.'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.body.user._id,
    { avatar },
    { new: true },
  )
    .then((me) => res.send(me))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении аватара.'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

export {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
