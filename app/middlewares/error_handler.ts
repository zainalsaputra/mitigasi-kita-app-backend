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

// import { Request, Response, NextFunction } from 'express';

// export const errorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.error(err);

//   const statusCode = err.status || 500;

//   res.status(statusCode).json({
//     message: err.message || 'Internal Server Error',
//     stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
//   });
// };

import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error caught:', err); // error dev console

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
