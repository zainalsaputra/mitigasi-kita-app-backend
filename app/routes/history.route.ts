import { Router, RequestHandler } from 'express';
import { validate } from '../middlewares/validate';
import { historySchema } from '../validations/history.validation';
import { authenticate } from '../middlewares/auth';
import * as historyController from '../controllers/history.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  validate(historySchema),
  historyController.postHistory as RequestHandler,
);

router.get('/', authenticate, historyController.getHistory as RequestHandler);

router.get('/:id', authenticate, historyController.getHistoryById);

router.delete('/:id', authenticate, historyController.deleteHistory);

export default router;
