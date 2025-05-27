import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(createError(404, `Route ${req.originalUrl} not found`));
};
