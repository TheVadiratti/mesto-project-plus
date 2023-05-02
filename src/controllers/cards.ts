import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { IncorrectDataError, NotFoundError } from '../services/errors';

const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else {
      next(err);
    }
  });

const likeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } },
  { new: true },
)
  .then((likes) => res.send(likes))
  .catch((err) => {
    if (err.name === 'ValidatorError') {
      next(new IncorrectDataError('Переданы некорректные данные для постановки лайка.'));
    } else if (err.name === 'CastError') {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    } else {
      next(err);
    }
  });

const dislikeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } },
  { new: true },
)
  .then((likes) => res.send(likes))
  .catch((err) => {
    if (err.name === 'ValidatorError') {
      next(new IncorrectDataError('Переданы некорректные данные для снятия лайка.'));
    } else if (err.name === 'CastError') {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    } else {
      next(err);
    }
  });

export {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
