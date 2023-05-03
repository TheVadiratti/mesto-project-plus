import express from 'express';
import mongoose from 'mongoose';
import errors from './middlewares/errors';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import auth from './middlewares/auth';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors);

app.listen(3000);
