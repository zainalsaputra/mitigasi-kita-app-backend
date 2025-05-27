import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // max 100 request/IP
  message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.',
});
