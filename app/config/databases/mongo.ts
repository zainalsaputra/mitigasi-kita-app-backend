// import { PrismaClient } from '../../generated/mongo';

// const mongo = new PrismaClient();

// export const connectToMongo = async (): Promise<void> => {
//   try {
//     await mongo.$connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error);
//     process.exit(1);
//   }
// };

// export const disconnectMongo = async (): Promise<void> => {
//   await mongo.$disconnect();
// };

// export default mongo;

import mongoose from 'mongoose';

const MONGO_URL =
  process.env.DATABASE_MONGO_URL || 'mongodb://localhost:27017/default_db';

export const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectMongo = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
};

export default mongoose;
