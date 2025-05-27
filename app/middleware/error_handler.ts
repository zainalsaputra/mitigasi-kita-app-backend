// const errorHandler = (err, req, res, next) => {
//   console.error(err);

//   const statusCode = err.status || 500;
//   const message = err.message || "Internal Server Error";

//   return res.status(statusCode).json({
//     status: "error",
//     message,
//   });
// };

// export default errorHandler;

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
