import { INCORRECT_DATA_CODE } from './constants';

export default class IncorrectDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = INCORRECT_DATA_CODE;
  }
}
