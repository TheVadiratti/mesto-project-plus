import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card';
import ForbiddenError from '../services/errors/Forbidden';
import NotFoundError from '../services/errors/NotFound';
import IncorrectDataError from '../services/errors/IncorrectData';

const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.send(cards))
  .catch((err) => {
    next(err);
  });

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
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
) => {
  const id = req.body.user._id;
  const errorCardNotFound = 'Карточка с указанным _id не найдена.';

  return Card.findById(req.params.cardId).orFail()
    .then((card) => {
      if (!card) {
        next(new NotFoundError(errorCardNotFound));
      } else if (String(card.owner) === String(id)) {
        return card.remove()
          .then(() => res.send(card))
          .catch((err) => next(err));
      } else {
        next(new ForbiddenError('Нельзя удалять чужую карточку.'));
      }
    })
    .catch((err) => {
      if (err instanceof Error.DocumentNotFoundError) {
        next(new NotFoundError(errorCardNotFound));
      } else if (err instanceof Error.CastError) {
        next(new IncorrectDataError('Передан невалидный ID.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } },
  { new: true },
).orFail()
  .then((likes) => res.send(likes))
  .catch((err) => {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else if (err instanceof Error.CastError) {
      next(new IncorrectDataError('Передан невалидный ID.'));
    } else {
      next(err);
    }
  });

const dislikeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } },
  { new: true },
).orFail()
  .then((likes) => res.send(likes))
  .catch((err) => {
    if (err instanceof Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
    } else if (err instanceof Error.CastError) {
      next(new IncorrectDataError('Передан невалидный ID.'));
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
