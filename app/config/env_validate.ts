import dotenv from 'dotenv';
// import { EnvConfig, envSchema } from '../validations/env.validation';
// import { ZodError } from 'zod';
dotenv.config();

// error

// export const validateEnv = () => {
//   try {
//     const envVars: EnvConfig = envSchema.parse(process.env);
//     return {
//       port: +envVars.PORT,
//       env: envVars.NODE_ENV,
//       DATABASE_MONGO_URL: envVars.DATABASE_MONGO_URL
//     };
//   } catch (error) {
//     let message = undefined;
//     if (error instanceof ZodError) {
//       message = error.errors;
//       console.error('Validation failed:', error.errors);
//     } else {
//       // message = error;
//       console.error('Error parsing environment variables:', error);
//     }
//   }
// };

export const validateEnv = () => {
  let mongoUrl = process.env.DATABASE_MONGO_URL_PRISMA;

  if (!mongoUrl) {
    console.error('DATABASE_MONGO_URL is not set. Please set it in your environment variables.');
    process.exit(1);
  }

  if (process.env.NODE_ENV === "production") {
    mongoUrl = process.env.DATABASE_MONGO_URL_PROD;
  } else if (process.env.NODE_ENV === "development") {
    mongoUrl = process.env.DATABASE_MONGO_URL_DEV;
  }else {
    console.error('NODE_ENV is not set or is invalid. Please set it to "production" or "development".');
  }
  
  // console.log('MongoDB URL:', mongoUrl);

  return {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    DATABASE_MONGO_URL: mongoUrl,
  };
};
