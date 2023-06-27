import { Router } from 'express';
import {
  getUsers,
  getUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
} from '../controllers/users';
import {
  getUserValidation,
  updateProfileValidation,
  updateAvatarValidation,
} from '../validations/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getMyProfile);

router.get('/:userId', getUserValidation, getUser);

router.patch('/me', updateProfileValidation, updateProfile);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
