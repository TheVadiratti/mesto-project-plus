import { Request } from 'express';
import { ObjectId } from 'mongoose';

type User = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

type Card = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createAt: Date;
};

interface UserRequest extends Request {
  user?: ObjectId;
}

export { User, Card, UserRequest };
