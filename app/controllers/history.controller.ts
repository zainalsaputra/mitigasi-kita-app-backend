import { Request, Response, NextFunction } from 'express';
import * as historyService from '../services/history.service';
import { sendResponse } from '../utils/response_helper';
// import { logActivity } from '../middlewares/log_activity';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    [key: string]: any;
  };
}

export const postHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const data = { userId, ...req.body };

    const result = await historyService.addUserHistory(data);
    sendResponse(res, 201, result, 'History has created successfully!');
  } catch (error) {
    console.error('Error caught:', error);
    next(error);
  }
};

export const getHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user.id;

    const result = await historyService.getAllHistory(userId);

    // logActivity({
    //   userId: req.user?.id,
    //   action: 'DELETE_HISTORY',
    //   method: req.method,
    //   url: req.originalUrl,
    //   status: 200,
    //   message: `GET all users history`
    // });

    sendResponse(res, 200, result);
  } catch (error) {
    console.error('Error caught:', error);
    next(error);
  }
};

export const deleteHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    const result = await historyService.removeHistoryById(id);
    sendResponse(res, 200, result, 'History has deleted successfully!');
  } catch (error) {
    console.error('Error caught:', error);
    next(error);
  }
};
