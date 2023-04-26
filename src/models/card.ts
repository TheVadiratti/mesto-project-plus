import { model, Schema } from 'mongoose';
import { Card } from '../types';

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
  },
  owner: {
    type: Schema.Types.ObjectId,
    requored: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<Card>('card', cardSchema);
