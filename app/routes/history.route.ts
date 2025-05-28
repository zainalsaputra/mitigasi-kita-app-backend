import { Router } from 'express';
import { postHistory } from '../controllers/history.controller';
import { validate } from '../middlewares/validate';
import { historySchema } from '../schemas/history.schema';

const router = Router();

router.post('/', validate(historySchema), postHistory);

export default router;
