import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import createError from 'http-errors';

export const validate =
  (schema: ZodSchema<any>) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const message = result.error.errors.map((e) => e.message).join(', ');
        return next(createError(400, `Validation Error: ${message}`));
      }

      next();
    };
