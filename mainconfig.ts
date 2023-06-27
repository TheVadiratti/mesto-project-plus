import * as dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, JWT_SECRET, DB_NAME } = process.env;
const PORT = 3000;

export {
  NODE_ENV,
  JWT_SECRET,
  DB_NAME,
  PORT,
};
