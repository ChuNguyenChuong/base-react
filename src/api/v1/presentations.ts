import axiosClient from '@app/config/axios';
import { AnyElement, IReportPresentation, ParamsGetAll } from '@app/types/generalTypes';

export const getAllPresentations = async ({
  createdAt,
  current,
  name,
  pageSize,
  status,
  title,
}: ParamsGetAll): Promise<{
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalPages: number;
  abstracts: AnyElement[];
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
  if (title && !!title.length) {
    title.forEach((item) => {
      params.append('title', String(item));
    });
  }

  const res = await axiosClient.get('api/Abstract/GetAll', {
    params: params,
  });
  return res.data;
};

export const deletePresentaion = async (id: string): Promise<AnyElement> => {
  const res = await axiosClient.delete(`api/Abstract/Delete`, {
    params: {
      id: id,
    },
  });
  return res.data;
};

export const updatePresentaion = async (data: IReportPresentation): Promise<AnyElement> => {
  const res = await axiosClient.put(`api/Abstract/Update`, data);
  return res.data;
};
