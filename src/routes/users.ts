import { Router } from 'express';
import {
  getUsers,
  getUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getMyProfile);

router.get('/:userId', getUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

export default router;
