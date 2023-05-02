/* eslint-disable max-classes-per-file */
const INCORRECT_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;

class IncorrectDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = INCORRECT_DATA_CODE;
  }
}

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

export { IncorrectDataError, NotFoundError };
