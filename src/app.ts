import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.listen(3000);
