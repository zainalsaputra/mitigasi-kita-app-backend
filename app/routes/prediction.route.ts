import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { predictionSchema } from '../validations/prediction.validation';
import { postPrediction } from '../controllers/prediction.controller';

const router = Router();

router.post('/', validate(predictionSchema), postPrediction);

export default router;
