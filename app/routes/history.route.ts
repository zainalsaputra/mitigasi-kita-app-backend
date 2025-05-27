// ✅ BENAR
import { Router } from 'express';
import { postHistory } from '../controllers/history.controller';

const router = Router();

router.post('/', postHistory);

export default router;
