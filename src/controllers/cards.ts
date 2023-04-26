import { Request, Response } from 'express';
import Card from '../models/card';

const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Ошибка получения всех карточек' }));

const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  return Card.create({
    name,
    link,
  })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send('Ошибка создания новой карточки'));
};

const deleteCard = (req: Request, res: Response) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send('Ошибка удаления карточки'));

export { getCards, createCard, deleteCard };
