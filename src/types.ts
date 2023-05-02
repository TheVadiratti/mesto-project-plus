import { ObjectId } from 'mongoose';

type User = {
  name: string;
  about: string;
  avatar: string;
};

type Card = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createAt: Date;
};

export { User, Card };
