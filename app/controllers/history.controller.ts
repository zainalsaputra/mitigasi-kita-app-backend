import { Request, Response } from 'express';
import * as historyService from '../services/history.service';

// class HistoryController {
//   static async postHistory(req: Request, res: Response): Promise<Response> {
//     try {
//       const data = req.body;
//       const history = await historyService.createHistory(data);
//       return res.status(201).json(history);
//     } catch (error) {
//       console.error('Error creating history:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }

// export default HistoryController;

export const postHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        // const savedHistory = await historyService.addHistory(data);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
