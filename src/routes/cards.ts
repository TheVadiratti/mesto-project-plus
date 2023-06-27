import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { createCardValidation, deleteCardValidation, likeCardValidation } from '../validations/cards';

const router = Router();

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.delete('/:cardId', deleteCardValidation, deleteCard);

router.put('/:cardId/likes', likeCardValidation, likeCard);

router.delete('/:cardId/likes', likeCardValidation, dislikeCard);

export default router;
