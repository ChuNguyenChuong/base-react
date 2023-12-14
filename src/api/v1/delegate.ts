import axiosClient from '@app/config/axios';
import { AnyElement, ParamsGetDelegate, IDelegate } from '@app/types/generalTypes';

type Country = {
  label: string;
  value: string;
};

export const getDelegate = async ({
  createdAt,
  current,
  name,
  pageSize,
  country,
}: ParamsGetDelegate): Promise<{
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalPages: number;
  delegate: IDelegate[];
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
  if (country && !!country.length) {
    country.forEach((item) => {
      params.append('country', String(item));
    });
  }

  const res = await axiosClient.get('api/Delegate/GetAll', {
    params: params,
  });
  return res.data;
};
export const getCountries = async (): Promise<Country[]> => {
  const res = (await axiosClient.get(`https://countriesnow.space/api/v0.1/countries`)).data;

  const data: Country[] = res.data.map((item: AnyElement) => {
    return {
      label: item.country ?? '',
      value: item.country,
    };
  });

  return data;
};

export const deleteDelegate = async (id: string): Promise<AnyElement> => {
  const res = await axiosClient.delete(`api/Delegate/Delete`, {
    params: {
      id: id,
    },
  });
  return res.data;
};
