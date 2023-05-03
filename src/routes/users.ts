import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
  login,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUser);

router.get('/me', getMyProfile);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

router.post('/signin', login);

router.post('/signup', createUser);

export default router;
