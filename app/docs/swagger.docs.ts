import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express, { Application } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mitigasikita Application API',
      summary: 'Computer Vision base APP',
      description:
        'A responsive web application developed to address the challenges of information gaps regarding earthquake and tsunami disasters in Indonesia.',
      termsOfService: 'https://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'https://www.example.com/support',
        email: 'support@example.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.1',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url:
          process.env.BASE_URL ||
          'http://localhost:3000',
      },
    ],
  },
  // apis: [path.join(__dirname, '../routes/*.ts')],
  apis: [
    path.join(__dirname, '../docs/features/auth.swagger.yaml'),
    path.join(__dirname, '../docs/features/history.swagger.yaml'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Application): void => {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    }),
  );

  const swaggerDistPath = require('swagger-ui-dist').getAbsoluteFSPath();
  app.use('/docs', express.static(swaggerDistPath));

  swaggerUi.setup(swaggerDocs, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
  });

  // const serverUrls = swaggerOptions.definition.servers?.map(
  //   (server) => server.url,
  // ) || [];

  // serverUrls.forEach((url) =>
  //   console.log(`Swagger docs available at : ${url}/docs`)
  // );
};

export default setupSwagger;
