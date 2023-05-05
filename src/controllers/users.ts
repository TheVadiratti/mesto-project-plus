import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants';
import User from '../models/user';
import IncorrectDataError from '../services/errors/IncorrectData';
import UnauthorizedError from '../services/errors/Unauthorized';
import NotFoundError from '../services/errors/NotFound';
import ConflictError from '../services/errors/Conflict';
import { UserRequest } from '../types';
import { findUser, setProfileData } from './index';

const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send(users))
  .catch((err) => {
    next(err);
  });

const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => findUser(res, next, req.params.userId);

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
      .then(() => res.status(201).send({
        name,
        about,
        avatar,
        email,
      }))
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          next(new IncorrectDataError('Переданы некорректные данные при создании пользователя.'));
        } else if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует.'));
        } else {
          next(err);
        }
      }))
    .catch((err) => {
      next(err);
    });
};

const getMyProfile = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => findUser(res, next, req.user);

const updateProfile = (req: UserRequest, res: Response, next: NextFunction) => {
  const data = req.body;

  return setProfileData(req, res, next, data);
};

const updateAvatar = (req: UserRequest, res: Response, next: NextFunction) => {
  const data = req.body;

  return setProfileData(req, res, next, data);
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const error = 'Неверная почта или пароль.';

  return User.findOne({ email }).select('+password').orFail()
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError(error));
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              next(new UnauthorizedError(error));
            } else {
              const token = `Bearer ${jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' })}`;

              res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
              const {
                name,
                about,
                avatar,
              } = user;
              res.send({
                name,
                about,
                avatar,
                email,
              });
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new IncorrectDataError('Переданы некорректный email.'));
      } else if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(error));
      } else {
        next(err);
      }
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
