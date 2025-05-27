import { Router } from 'express';
import { apiLimiter } from '../middlewares/rate_limiter';

const router = Router();

import authRoute from './auth.route';
router.use('/auth', apiLimiter, authRoute);


import historyRoute from './history.route';
router.use('/history', historyRoute);


export default router;
