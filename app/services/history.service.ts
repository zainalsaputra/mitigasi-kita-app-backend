import { createUserHistory, getAllUsersHistory } from '../repositories/history.repository'

export const addUserHistory = async (payload: any) => {
  return await createUserHistory(payload);
};

// export const getAllHistory = async (payload: any) => {
//   return await historyRepository.getAllHistory(payload);
// };
