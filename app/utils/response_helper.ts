import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message?: any,
) => {
  const response = {
    status: 'success',
    ...(message !== undefined && { message }),
    data,
  };

  res.status(statusCode).json(response);
};
