import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsupersecret';

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);
