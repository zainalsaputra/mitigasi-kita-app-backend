import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response_helper';
import { getPredictionFromModel } from '../services/prediction.service';

export const postPrediction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await getPredictionFromModel(req.body);
    sendResponse(res, 200, result, 'Prediction fetched successfully!');
  } catch (error) {
    next(error);
  }
};
