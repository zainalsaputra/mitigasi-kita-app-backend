import { createUserHistory, getAllHistoryByUserId, deleteHistoryById } from '../repositories/history.repository'

export const addUserHistory = async (payload: any) => {
  return await createUserHistory(payload);
};

export const getAllHistory = async (userId: any) => {
  return await getAllHistoryByUserId(userId);
};

export const removeHistoryById = async (id: any) => {
  return await deleteHistoryById(id);
};
