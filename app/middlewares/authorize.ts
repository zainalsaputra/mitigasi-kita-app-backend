import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

interface AuthenticatedRequest extends Request {
  user?: {
    role?: string;
    [key: string]: any; // for other properties like id, email, etc.
  };
}

export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(createError(401, 'Unauthorized: No role found in token'));
    }

    if (!allowedRoles.includes(userRole)) {
      return next(createError(403, 'Forbidden: Access is denied'));
    }

    next();
  };
