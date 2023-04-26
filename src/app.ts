import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';

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

app.use('/', userRouter);

app.listen(3000);
