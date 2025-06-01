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
  return {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    DATABASE_MONGO_URL: process.env.DATABASE_MONGO_URL,
  };
};
