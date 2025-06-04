import { PrismaClient } from '../../../generated/postgres';

const getPostgresUrl = (): string => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return process.env.DATABASE_POSTGRES_URL_PROD || '';
  }
  return process.env.DATABASE_POSTGRES_URL_DEV || '';
};

if (getPostgresUrl()) {
  process.env.DATABASE_POSTGRES_URL_PRISMA = getPostgresUrl();
}

const postgres = new PrismaClient();

export const connectToPostgres = async (): Promise<void> => {
  try {
    await postgres.$connect();
    console.log(`Connected to PostgreSQL (${process.env.NODE_ENV})`);
  } catch (error) {
    console.error('PostgreSQL connection failed:', error);
    process.exit(1);
  }
};

export const disconnectPostgres = async (): Promise<void> => {
  await postgres.$disconnect();
};

export default postgres;
