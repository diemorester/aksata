import axiosInstance from '../axios';
import { getCookie } from '../server';

export const clockInFetch = async () => {
  const token = await getCookie('access_token');

  const res = await axiosInstance.post(
    '/absensi/clock-in',
    {},
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const clockOutFetch = async () => {
  const token = await getCookie('access_token');

  const res = await axiosInstance.post(
    '/absensi/clock-out',
    {},
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const excelFetch = async (filterBy: string) => {
  const res = await axiosInstance.get(
   `/absensi/export-excel?filterBy=${filterBy}`, {
    responseType: 'blob'
  }
  );
console.log(res, 'terus dikasih tanda');

  return res;
};