import { Request, Response } from 'express';

export default (err: any, req: Request, res: Response) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
};
