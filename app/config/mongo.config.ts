import { PrismaClient } from '../../generated/mongo';

const mongo = new PrismaClient();

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongo.$connect();
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectMongo = async (): Promise<void> => {
  await mongo.$disconnect();
};

export default mongo;
