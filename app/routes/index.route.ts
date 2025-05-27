import { Router } from 'express';
import historyRoute from './history.route';

const router = Router();

router.use('/history', historyRoute);

export default router;
