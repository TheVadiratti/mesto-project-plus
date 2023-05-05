import { Request, Response } from 'express';

export default (err: any, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    res.status(statusCode).send({ message: 'На сервере произошла ошибка' });
  } else {
    res.status(statusCode).send({ message });
  }
};
