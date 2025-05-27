import * as historyRepository from '../repositories/history.repository';

// class HistoryService {

//     async addHistory(payload: any) {
//         return await historyRepository.createHistory(payload);
//     }

// }

// export default HistoryService;

export const addHistory = async (payload: any) => {
  return await historyRepository.createHistory(payload);
};
