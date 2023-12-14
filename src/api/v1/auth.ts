import axiosClient from '@app/config/axios';
import { ILogin, IUser } from '@app/types/generalTypes';

export const loginApi = async (data: ILogin): Promise<IUser> => {
  const res = await axiosClient.post(`api/Login/Login`, data);
  return res.data;
};
