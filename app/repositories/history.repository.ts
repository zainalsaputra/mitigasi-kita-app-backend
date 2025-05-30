import postgres from '../config/postgres.config';

export const createUserHistory = async (data: any) => {
  return postgres.history.create({
    data,
  });
};

export const getAllHistoryByUserId = async (userId: any) => {
  return postgres.history.findMany({
    where: {
      userId,
    },
  });
};

export const findHistoryById = async (id: any) => {
  return postgres.history.findUnique({
    where: {
      id,
    },
  });
};

export const deleteHistoryById = async (id: any) => {
  return postgres.history.delete({
    where: {
      id,
    },
  });
};
