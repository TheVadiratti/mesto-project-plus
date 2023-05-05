import { FORBIDDEN_CODE } from './constants';

export default class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN_CODE;
  }
}
