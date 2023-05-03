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

router.get('/:userId', getUser);

router.get('/me', getMyProfile);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

export default router;
