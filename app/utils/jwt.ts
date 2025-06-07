import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsupersecret';

export const generateAccessToken = (payload: string | object | Buffer, expiresIn: string = '1d') =>
  jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);

export const generateRefreshToken = (payload: string | object | Buffer, expiresIn: string = '7d') =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn } as SignOptions);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);

export const decodeToken = (token: string) => jwt.decode(token);
