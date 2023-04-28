import express from 'express';
import mongoose from 'mongoose';
import errors from './middlewares/errors';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.body.user = {
    _id: '6448ce5b7272030c477f5ce1',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors);

app.listen(3000);
