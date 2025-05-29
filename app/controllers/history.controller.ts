import { Request, Response, NextFunction } from 'express';
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
) => {
  try {
    const userId = req.user.userId;
    const data = { userId, ...req.body};
    const savedHistory = await historyService.addUserHistory(data);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// export const getHistory = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const data = req.body;
//     const savedHistory = await historyService.getAllHistory(data);
//     res.status(201).json(savedHistory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

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
