import postgres from '../config/postgres.config';

export const createUserHistory = async (data: any) => {
  return postgres.history.create({
    data,
  });
};

export const getAllUsersHistory = async (userId: any) => {
  return postgres.history.findMany({
    where: {
      userId,
    }
  });
};

