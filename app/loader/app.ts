import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import http from 'http';
import dotenv from 'dotenv';
import ExpressMongoSanitize from 'express-mongo-sanitize';

dotenv.config();

// Database connections
// import { connectToPostgres, disconnectPostgres } from '../config/postgres.config';
// import { connectToMongo, disconnectMongo } from '../config/mongo.config';

// Middleware configurations
import { errorHandler } from '../middlewares/error_handler';
import { notFound } from '../middlewares/not_found_handler';
import { corsOptions } from '../config/cors_options';
import {
  morganErrorHandler,
  morganSuccessHandler,
} from '../middlewares/morgan';
import { activityLogger } from '../middlewares/log_activity';

// Swagger documentation setup
import setupSwagger from '../docs/swagger.docs';

// Routes
import welcomeRoute from '../routes/welcome.route';
import mainRoute from '../routes/index.route';
// const app: Application = express();
// const server = http.createServer(app);

export const bootstrapExpress = (app: any) => {
  // Security and parsing middlewares
  app.use(ExpressMongoSanitize());

  app.use(morgan('dev'));

  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    }),
  );

  // Success Activity Logger
  app.use(activityLogger)

  // Error hanlder logs
  app.use(morganErrorHandler);
  app.use(morganSuccessHandler);

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));

  // Initialize Swagger
  setupSwagger(app);

  // Register routes
  app.use('/', welcomeRoute);
  app.use('/api', mainRoute);

  // Error handling middlewares
  app.use(errorHandler);
  app.use(notFound);
};

// Server configuration
// const PORT = process.env.PORT || '3000';
// const HOST = process.env.HOST || '127.0.0.1';

// server.listen(PORT, async () => {
//   console.log(`Server is running at http://${HOST}:${PORT}`);

//   await connectToPostgres();
//   await connectToMongo();
// });

// // Graceful shutdown handler
// const shutdown = async () => {
//   console.log('\nShutting down server...');

//   await disconnectPostgres();
//   await disconnectMongo();

//   process.exit(0);
// };

// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);
