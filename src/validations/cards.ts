import { celebrate, Joi } from 'celebrate';
import { LINK_REGEX } from '../utils/constants';
import checkId from './index';

const checkName = () => Joi.string().required().min(2).max(30);
const checkLink = () => Joi.string().required().pattern(LINK_REGEX);

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: checkName(),
    link: checkLink(),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: checkId(),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: checkId(),
  }),
});

export { createCardValidation, deleteCardValidation, likeCardValidation };
