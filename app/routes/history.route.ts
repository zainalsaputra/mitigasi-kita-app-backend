import { Router } from 'express';
import { postHistory } from '../controllers/history.controller';
import { validate } from '../middleware/validate';
import { historySchema } from '../validators/history.validator';

const router = Router();

router.post('/', validate(historySchema), postHistory);

export default router;
