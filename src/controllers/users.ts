import { Request, Response } from 'express';
import User from '../models/user';

const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка получения всех пользователей' }));

const getUser = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((user) => res.send(user))
  .catch(() => res.status(500).send('Ошибка получения данных пользователя'));

const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send('Ошибка создания нового пользователя'));
};

const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.body.user._id,
    { name, about },
    { new: true },
  )
    .then((me) => res.send(me))
    .catch(() => res.status(500).send('Ошибка изменения профиля'));
};

const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.body.user._id,
    { avatar },
    { new: true },
  )
    .then((me) => res.send(me))
    .catch(() => res.status(500).send('Ошибка изменения аватара'));
};

export {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
