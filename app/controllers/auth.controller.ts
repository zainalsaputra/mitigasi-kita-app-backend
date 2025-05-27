import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
};
