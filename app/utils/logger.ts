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
import { validateEnv } from '../config/env_validate';

const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const nodeEnv = validateEnv()?.env;
const mongoUri = process.env.DATABASE_MONGO_URL || 'mongodb://localhost:27017/logs';

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
      collection: 'activity_logs',
      tryReconnect: true,
      level: 'info',
    }),
  ],
});
