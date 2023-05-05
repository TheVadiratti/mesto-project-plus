import { CONFLICT_CODE } from './constants';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_CODE;
  }
}
