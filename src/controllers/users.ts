import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants';
import User from '../models/user';
import { IncorrectDataError, UnauthorizedError, NotFoundError } from '../services/errors';

const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (user) {
      res.send(user);
    } else {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
  })
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

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new IncorrectDataError('Переданы некорректные данные при создании пользователя.'));
        } else {
          next(err);
        }
      }))
    .catch((err) => next(err));
};

const getMyProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.body.user._id)
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь не найден.'));
    } else {
      next(err);
    }
  });

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

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неверная почта или пароль.'));
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              next(new UnauthorizedError('Неверная почта или пароль.'));
            } else {
              const token = `Bearer ${jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' })}`;

              res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
              res.send(user);
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

export {
  getUsers,
  getUser,
  createUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
  login,
};
