import express from 'express';
import mongoose from 'mongoose';
import errors from './middlewares/errors';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import auth from './middlewares/auth';
import { login, createUser } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUserValidation, loginValidation } from './validations/users';
import notFoundRoute from './middlewares/notFoundRoute';
import { DB_NAME, PORT } from '../mainconfig';

const app = express();

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// FIXME краштест для ревью, потом удалить
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(notFoundRoute);
app.use(errors);

app.listen(PORT);
