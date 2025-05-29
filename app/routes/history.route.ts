import { Router } from 'express';
import { postHistory } from '../controllers/history.controller';
import { validate } from '../middlewares/validate';
import { historySchema } from '../schemas/history.schema';
import { authenticate } from '../middlewares/auth';

const router = Router();

import { RequestHandler } from 'express';

router.post('/', authenticate, validate(historySchema), postHistory as RequestHandler);

export default router;
