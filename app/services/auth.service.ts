import postgres from '../config/postgres.config';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeToken,
} from '../utils/jwt';

export const registerUser = async (payload: any) => {
  try {
    const existing = await postgres.user.findUnique({
      where: { email: payload.email },
    });

    if (existing) {
      throw new createError.Conflict('Email already in use');
    }

    const hashed = await bcrypt.hash(payload.password, 10);
    const { password, ...rest } = payload;
    const user = await postgres.user.create({
      data: { ...rest, password: hashed },
    });

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    await postgres.user.update({
      where: { id: user.id },
      data: {
        RefreshToken: {
          create: {
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload: any) => {
  try {
    const user = await postgres.user.findUnique({
      where: { email: payload.email },
    });

    const isValid =
      user && (await bcrypt.compare(payload.password, user.password));
    if (!isValid) {
      throw new createError.Unauthorized('Invalid email or password');
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    await postgres.refreshToken.update({
      where: { userId: user.id },
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const refreshTokenize = async (payload: any) => {
  try {
    const token = decodeToken(payload.refreshToken);
    if (!token || typeof token === 'string' || !('email' in token)) {
      throw new createError.Unauthorized('Unauthorized');
    }

    const storedToken = await postgres.user.findFirst({
      where: { email: token.email },
      select: {
        RefreshToken: {
          select: {
            token: true,
            expiresAt: true,
          },
        },
      },
    });

    if (
      !storedToken ||
      !storedToken.RefreshToken ||
      storedToken.RefreshToken.length === 0
    ) {
      throw new createError.Unauthorized('Invalid refresh token');
    }

    if (new Date() > new Date(storedToken.RefreshToken[0].expiresAt)) {
      throw new createError.Unauthorized('Refresh token expired');
    }

    const decoded = verifyRefreshToken(storedToken.RefreshToken[0].token);
    if (!decoded || typeof decoded === 'string')
      throw new createError.Unauthorized('Invalid refresh token');

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    await postgres.refreshToken.update({
      where: { userId: decoded.userId },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw error;
  }
};
