import { bootstrapExpress } from './app';
import { logger } from '../middlewares/logger';
import { validateEnv } from '../config/env.config';
import { connectToMongo } from '../config/mongo.config';

export const bootstrap = async (app: any) => {
  validateEnv();
  await connectToMongo();
  bootstrapExpress(app);
  logger.info('Express app initiated.');
};
