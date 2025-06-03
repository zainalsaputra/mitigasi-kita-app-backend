import { bootstrapExpress } from './app';
import { logger } from '../utils/logger';
import { validateEnv } from '../config/env_validate';
import { connectToMongo } from '../config/databases/mongo';
import { connectToPostgres } from '../config/databases/postgres';

export const bootstrap = async (app: any) => {
    validateEnv();
    await connectToMongo();
    await connectToPostgres();
    bootstrapExpress(app);
    logger.info('Express app initiated.');
};
