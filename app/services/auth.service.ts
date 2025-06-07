import postgres from '../config/databases/postgres';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeToken,
  verifyToken,
} from '../utils/jwt';
import { transporter } from '../utils/mailer';


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
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
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
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
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
      id: decoded.id,
      email: decoded.email,
    });

    const newRefreshToken = generateRefreshToken({
      id: decoded.id,
      email: decoded.email,
    });

    await postgres.refreshToken.update({
      where: { userId: decoded.id },
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

export const generateResetToken = async (email: string) => {
  const user = await postgres.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new createError.NotFound('User not found with this email');
  }
  return generateAccessToken({ id: user.id, email: user.email, }, '15m');
};

export const sendResetEmail = async (token: string) => {

  const verifiedToken = verifyToken(token);
  if (!verifiedToken || typeof verifiedToken === 'string') {
    throw new createError.Unauthorized('Invalid token');
  }

  const tokenData = decodeToken(token);
  if (
    !tokenData ||
    typeof tokenData === 'string' ||
    !('id' in tokenData) ||
    !('email' in tokenData)
  ) {
    throw new createError.Unauthorized('Invalid token');
  }

  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"MitigasiKita Support Team" <${process.env.EMAIL_USER}>`,
    to: (tokenData as { email: string }).email,
    subject: 'Account Password Reset Request',
    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p style="color: #555;">
                            We received a request to reset your password. Click the button below to proceed:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" style="background-color:rgb(196, 0, 0); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #999; font-size: 14px;">
                            This link will expire in 15 minutes. If you did not request a password reset, please ignore this email.
                        </p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #bbb; font-size: 12px; text-align: center;">
                            &copy; ${new Date().getFullYear()} MitigasiKita Application. All rights reserved.
                        </p>
                    </div>
                `,
  };
  await transporter.sendMail(mailOptions);
};

export const updateUserPassword = async (payload: any) => {
  const tokenData = decodeToken(payload.token);
  if (!tokenData || typeof tokenData === 'string' || !('id' in tokenData && 'email' in tokenData)) {
    throw new createError.Unauthorized('Invalid token');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  return await postgres.user.update({
    where: { id: tokenData.id },
    data: { password: hashedPassword }
  });
}