import postgres from '../config/postgres.config';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { signToken } from '../utils/jwt';

export const registerUser = async (payload: any) => {
    const existing = await postgres.user.findUnique({
        where: {
            email: payload.email
        }
    });

    if (existing) {
        throw new createError.Conflict('Email already in use');
    }

    const hashed = await bcrypt.hash(payload.password, 10);
    const { password, ...rest } = payload;
    const user = await postgres.user.create({
        data: { ...rest, password: hashed },
    });

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    return { token };
};

export const loginUser = async (payload: any) => {
    const user = await postgres.user.findUnique({ where: { email: payload.email } });

    const isValid = user && await bcrypt.compare(payload.password, user.password);
    if (!isValid) {
         throw new createError.Unauthorized('Invalid email or password');
    }

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    return { token };
};
