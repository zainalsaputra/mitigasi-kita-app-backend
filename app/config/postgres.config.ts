import { PrismaClient } from '../../generated/postgres';

const postgres = new PrismaClient();

export const connectToPostgres = async (): Promise<void> => {
  try {
    await postgres.$connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('PostgreSQL connection failed:', error);
    process.exit(1);
  }
};

export const disconnectPostgres = async (): Promise<void> => {
  await postgres.$disconnect();
};

export default postgres;
