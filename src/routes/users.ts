import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

export default router;
