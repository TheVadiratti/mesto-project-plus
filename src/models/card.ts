import { model, Schema } from 'mongoose';
import { Card } from '../types';
import { LINK_REGEX } from '../utils/constants';

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link: string) {
        return LINK_REGEX.test(link);
      },
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<Card>('card', cardSchema);
