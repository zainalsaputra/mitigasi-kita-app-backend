import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  refreshTokenize,
  generateResetToken,
  sendResetEmail,
  updateUserPassword,
} from '../services/auth.service';
import { sendResponse } from '../utils/response_helper';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await refreshTokenize(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await generateResetToken(req.body.email);
    await sendResetEmail(token);
    sendResponse(res, 201, 'Reset password email sent successfully!');
  } catch (err: any) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response, 
  next: NextFunction,
) => {
  try {
    await updateUserPassword(req.body);
    sendResponse(res, 200, 'Password reset successfully!');
  } catch (err) {
   next(err);
  }
};