import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import * as historyService from '../services/history.service';

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
      return next(createError.BadRequest('User ID is required'));

    }

    const result = await historyService.getAllHistory(userId);
    if (!result || result.length === 0) {
      return next(createError.NotFound('User does not have history'));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error caught:', error);
    next(createError.InternalServerError('An unexpected error occurred'));
  }
};

export const deleteHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(createError.BadRequest('History ID is required'));
    }
    const result = await historyService.removeHistoryById(id);
    if (!result) {
      return next(createError.InternalServerError('Failed to create history'));
    }
    res.status(201).json(result);
  } catch (error) {
    console.error('Error caught:', error);
    next(createError.InternalServerError('An unexpected error occurred'));
  }
};
