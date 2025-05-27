import postgres from "../config/postgres.config";

export const createHistory = async (data: any) => {
  return postgres.history.create({
    data,
  });
}
