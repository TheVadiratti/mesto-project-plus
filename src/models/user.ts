import mongoose from 'mongoose';
import { User } from '../types';
import { EMAIL_REGEX } from '../utils/constants';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return EMAIL_REGEX.test(email);
      },
      message: 'Введите адрес электронной почты',
    },
  },
  password: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<User>('user', userSchema);
