import cors from 'cors';

const productionUrl = process.env.PRODUCTION_URL || 'http://localhost:3000';
const userMailerUrl = process.env.CLIENT_URL || 'http://localhost:5173';

const allowedOrigins: string[] = [
  'http://localhost:3000',
  'http://localhost:5000',
  productionUrl,
  userMailerUrl,
];

export const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
  optionsSuccessStatus: 200,
};
