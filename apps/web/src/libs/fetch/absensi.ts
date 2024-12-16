import { AbsensiResponse } from '@/types/absensiTypes';
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

export const fetchAbsensi = async ( userId: number, page: number, limit: number, search?: string): Promise<AbsensiResponse> => {
  const res = await axiosInstance.get<AbsensiResponse>("/getall-attendace", {
    params: {
      userId,
      page,
      limit,
      ...(search && { search })
    }
  });
  return res.data
};