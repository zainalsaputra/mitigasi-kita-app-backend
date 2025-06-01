import { createWriteStream } from 'fs';
import morgan from 'morgan';
import path from 'path';
import { validateEnv } from '../config/env.config';

const nodeEnv = validateEnv()?.env;
// const nodeEnv = process.env.NODE_ENV;

// Only at production IP address noted
const getIPFormat = () => (nodeEnv === 'production' ? ':remote-addr - ' : '');

const accessLogStream = createWriteStream(
  path.join(__dirname, '..', 'logs/access.log'),
  { flags: 'a' },
);

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const morganSuccessHandler = morgan(successResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});

const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date `;
const morganErrorHandler = morgan(errorResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});

export { morganErrorHandler, morganSuccessHandler };
