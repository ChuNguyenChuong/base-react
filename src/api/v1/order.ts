import axiosClient from '@app/config/axios';
import { AnyElement, IOrder, ParamsGetOrder } from '@app/types/generalTypes';

export const getAllOrder = async ({
  createdAt,
  current,
  name,
  pageSize,
  status,
}: ParamsGetOrder): Promise<{
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalPages: number;
  order: IOrder[];
}> => {
  const params = new URLSearchParams();
  params.append('page', String(current));
  params.append('pageSize', String(pageSize));

  if (createdAt && !!createdAt.length) {
    createdAt.forEach((item) => {
      params.append('createdAt', String(item));
    });
  }
  if (name && !!name.length) {
    name.forEach((item) => {
      params.append('name', String(item));
    });
  }
  if (status && !!status.length) {
    status.forEach((item) => {
      params.append('status', String(item));
    });
  }

  const res = await axiosClient.get('api/Order/GetAll', {
    params: params,
  });

  return res.data;
};

export const deleteOrder = async (id: string): Promise<AnyElement> => {
  const res = await axiosClient.delete(`api/Order/Delete`, {
    params: {
      id: id,
    },
  });
  return res.data;
};

export const updateOrder = async (data: IOrder): Promise<AnyElement> => {
  const res = await axiosClient.put(`api/Order/Update`, data);
  return res.data;
};
