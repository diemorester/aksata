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

export const excelFetch = async () => {
  const res = await axiosInstance.get(
    '/absensi/export-excel', {
    responseType: 'blob'
  }
  );

  return res;
};