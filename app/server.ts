import express, { Application } from 'express';
import http from 'http';
import setupSwagger from './docs/swagger.docs';
// import routes from './routes/index';
// import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

import { connectToPostgres, disconnectPostgres } from './config/postgres.config';
import { connectToMongo, disconnectMongo } from './config/mongo.config';

const app: Application = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// app.use(routes);
// app.use(errorHandler);

const PORT: string = process.env.PORT || '3000';
const HOST: string = process.env.HOST || '127.0.0.1';

server.listen(PORT, async () => {
    console.log(`🚀 Server is running at http://${HOST}:${PORT}`);

    await connectToPostgres();
    await connectToMongo();
  });

// Graceful shutdown
const shutdown = async () => {
  console.log('\n Shutting down server...');
  await disconnectPostgres();
  await disconnectMongo();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
