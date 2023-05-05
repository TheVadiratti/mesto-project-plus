import { celebrate, Joi } from 'celebrate';
import { LINK_REGEX } from '../utils/constants';
import { checkUser, checkId } from './index';

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(LINK_REGEX),
    user: checkUser(),
  }),
});

const deleteCardValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
  }),
  params: Joi.object().keys({
    cardId: checkId(),
  }),
});

const likeCardValidation = celebrate({
  body: Joi.object().keys({
    user: checkUser(),
  }),
  params: Joi.object().keys({
    cardId: checkId(),
  }),
});

export { createCardValidation, deleteCardValidation, likeCardValidation };
