import { celebrate, Joi } from 'celebrate';
import { LINK_REGEX, EMAIL_REGEX } from '../utils/constants';
import { checkUser, checkId } from './index';

const checkName = () => Joi.string().min(2).max(30);
const checkAbout = () => Joi.string().min(2).max(200);
const checkAvatar = () => Joi.string().pattern(LINK_REGEX);
const checkEmail = () => Joi.string().required().pattern(EMAIL_REGEX);
const checkPassword = () => Joi.string().required();

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: checkName(),
    about: checkAbout(),
    avatar: checkAvatar(),
    email: checkEmail(),
    password: checkPassword(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: checkEmail(),
    password: checkPassword(),
  }),
});

const getUserValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
  }),
  params: Joi.object().keys({
    userId: checkId(),
  }),
});

const getMyProfileValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
    name: checkName(),
    about: checkAbout(),
  }),
  params: Joi.object().keys({
    userId: checkId(),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
    avatar: checkAvatar(),
  }),
});

export {
  createUserValidation,
  loginValidation,
  getUserValidation,
  getMyProfileValidation,
  updateProfileValidation,
  updateAvatarValidation,
};
