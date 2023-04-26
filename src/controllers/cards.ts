import { Request, Response } from 'express';
import Card from '../models/card';

const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Ошибка получения всех карточек' }));

const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send('Ошибка создания новой карточки'));
};

const deleteCard = (req: Request, res: Response) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send('Ошибка удаления карточки'));

const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } },
  { new: true },
)
  .then((likes) => res.send(likes))
  .catch(() => res.status(500).send('Ошибка добавления лайка'));

const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } },
  { new: true },
)
  .then((likes) => res.send(likes))
  .catch(() => res.status(500).send('Ошибка удаления лайка'));

export {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
