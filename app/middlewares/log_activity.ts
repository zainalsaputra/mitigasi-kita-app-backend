// app/middlewares/activityLogger.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger'; // pastikan path-nya sesuai

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    [key: string]: any;
  };
}

export const activityLogger = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const oldSend = res.send;

    res.send = function (body: any) {
        const logData = {
            action: res.statusCode < 400 ? 'SUCCESS_ACCESS' : 'FAILED_ACCESS',
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            message: res.statusCode < 400 ? 'Request successful' : 'Request failed',
            userId: req.user?.id, 
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        };

        logger.info(logData); 

        return oldSend.call(this, body);
    };

    next();
};
