import { z } from 'zod';

export const historySchema = z.object({
  location: z.string(),
  city: z.string(),
  agency: z.string(),
  mag_type: z.string(),
  magnitude: z.number(),
  depth: z.number(),
  azimuth_gap: z.number(),
  phasecount: z.number(),
  potensi_tsunami: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  temperature_2m_min: z.number(),
  temperature_2m_max: z.number(),
  windspeed_10m_max: z.number(),
  precipitation_sum: z.number(),
  status: z.string(),
});
