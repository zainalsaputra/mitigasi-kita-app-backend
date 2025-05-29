import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import * as historyService from '../services/history.service';

// Extend Express Request interface to include 'user'
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    [key: string]: any;
  };
}
export const postHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(createError.BadRequest('User ID is required'));
    }

    const data = { userId, ...req.body };
    const savedHistory = await historyService.addUserHistory(data);
    if (!savedHistory) {
      return next(createError.InternalServerError('Failed to create history'));
    }

    res.status(201).json(savedHistory);
  } catch (error) {
    console.error('Error caught:', error);
    next(createError.InternalServerError('An unexpected error occurred'));
  }
};

export const getHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      next(createError.BadRequest('User ID is required'));
      return;
    }

    const result = await historyService.getAllHistory(userId);
    if (!result || result.length === 0) {
      next(createError.NotFound('User does not have history'));
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error caught:', error);
    next(createError.InternalServerError('An unexpected error occurred'));
  }
};

// export const deleteHistory = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const data = req.body;
//     const savedHistory = await historyService.addHistory(data);
//     res.status(201).json(savedHistory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
