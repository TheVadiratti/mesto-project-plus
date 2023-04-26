import { Router } from 'express';
import { getCards, createCard, deleteCard } from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);

router.post('./cards', createCard);

router.delete('./cards/:cardId', deleteCard);

export default router;
