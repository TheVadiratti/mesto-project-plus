import { Joi } from 'celebrate';

const checkUser = () => Joi.object().keys({ _id: Joi.string().required() }).unknown(true);
const checkId = () => Joi.string().required().alphanum();

export { checkUser, checkId };
