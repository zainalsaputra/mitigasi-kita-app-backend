import { Router } from 'express';
import { login, register, refreshToken } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from '../validations/auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshTokenSchema), refreshToken);

export default router;
