import { z } from 'zod';

export const predictionSchema = z.object({
  latitude: z.number({ required_error: 'Latitude is required' }),
  longitude: z.number({ required_error: 'Longitude is required' }),
});
