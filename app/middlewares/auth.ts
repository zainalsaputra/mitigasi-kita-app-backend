import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'Unauthorized: Token missing'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(401, 'Unauthorized: Token invalid'));
  }
};
