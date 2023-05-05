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
  getMyProfileValidation,
  updateProfileValidation,
  updateAvatarValidation,
} from '../validations/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getMyProfileValidation, getMyProfile);

router.get('/:userId', getUserValidation, getUser);

router.patch('/me', updateProfileValidation, updateProfile);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
