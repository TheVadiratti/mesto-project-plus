import { Request, Response } from 'express';
import User from '../models/user';

const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: 'Ошибка получения всех пользователей' }));

const getUser = (req: Request, res: Response) => User.findById(req.params.id)
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

export { getUsers, getUser, createUser };
