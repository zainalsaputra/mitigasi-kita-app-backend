import mongoose from 'mongoose';

const getMongoUrl = (): string => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return process.env.DATABASE_MONGO_URL_PROD || '';
  }
  return process.env.DATABASE_MONGO_URL_DEV || '';
};

export const connectToMongo = async (): Promise<void> => {
  try {
    const MONGO_URL = getMongoUrl();
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to MongoDB (${process.env.NODE_ENV})`);
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

