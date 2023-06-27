import { Joi } from 'celebrate';

const checkId = () => Joi.string().required().hex();

export default checkId;
