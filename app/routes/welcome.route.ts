import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: `Welcome to Mitigasi Kita Application API, view documentation on ${req.protocol}://${req.get('host')}/docs`,
  });
});

export default router;
