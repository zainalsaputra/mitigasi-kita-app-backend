// import winston from 'winston';
// import { validateEnv } from '../config/env.config';
// const { format, createLogger, transports } = winston;
// const { printf, combine, timestamp, colorize, uncolorize } = format;

// const nodeEnv = validateEnv()?.env;
// const winstonFormat = printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp}: ${level}: ${stack || message}`;
// });
// export const logger = createLogger({
//   level: nodeEnv === 'development' ? 'debug' : 'info',
//   format: combine(
//     timestamp(),
//     winstonFormat,
//     nodeEnv === 'development' ? colorize() : uncolorize(),
//   ),
//   transports: [new transports.Console()],
// });

// logger.ts
import winston from 'winston';
import 'winston-mongodb';
import fs from 'fs';
import path from 'path';
import { validateEnv } from '../config/env_validate';

const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const logFilename = 'access.log';
const logDirectory = path.resolve(__dirname, '../logs');
const logFile = path.join(logDirectory, logFilename);

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');
}

const nodeEnv = validateEnv()?.env;
const mongoUri = validateEnv()?.DATABASE_MONGO_URL || 'mongodb://localhost:27017/activity_logs';

// console.log('MongoDB URL:', mongoUri);

const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: nodeEnv === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    nodeEnv === 'development' ? colorize() : uncolorize(),
  ),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      db: mongoUri,
      options: { useUnifiedTopology: true },
      collection: logFilename,
      tryReconnect: true,
      level: 'info',
    }),
  ],
});
