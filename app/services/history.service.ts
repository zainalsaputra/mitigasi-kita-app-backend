import createError from 'http-errors';
import * as historyRepository from '../repositories/history.repository';

export const addUserHistory = async (payload: any) => {
  if (!payload.userId) {
    throw createError.BadRequest('User ID is required');
  }

  const savedHistory = await historyRepository.createUserHistory(payload);
  if (!savedHistory) {
    throw createError.InternalServerError('Failed to create history');
  }

  return savedHistory;
};

export const getAllHistory = async (userId: any) => {
  if (!userId) {
    throw createError.BadRequest('User ID is required');
  }

  const result = await historyRepository.getAllHistoryByUserId(userId);
  if (!result || result.length === 0) {
    throw createError.NotFound('User does not have history');
  }

  return result;
};

export const getHistoryById = async (id: any) => {
  if (!id) {
    throw createError.BadRequest('History ID is required');
  }
  const history = await historyRepository.findHistoryById(id);
  if (!history) {
    throw createError.NotFound('History ID not found');
  }
  return history;
};

export const removeHistoryById = async (id: any) => {
  if (!id) {
    throw createError.BadRequest('History ID is required');
  }

  const history = await historyRepository.findHistoryById(id);
  if (!history) {
    throw createError.NotFound('History ID not found');
  }

  const result = await historyRepository.deleteHistoryById(id);
  if (!result) {
    throw createError.NotFound('Failed to delete history');
  }

  return result;
};
