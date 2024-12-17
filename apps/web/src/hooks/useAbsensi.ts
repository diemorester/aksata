'use client';

import { useQuery } from '@tanstack/react-query';
import { Absensi, AbsensiParams } from '@/types/absensiTypes';
import axiosInstance from '@/libs/axios';
import { getCookie } from '@/libs/server';

interface AbsensiResponse {
  data: {
    meta: AbsensiParams;
    attendance: Absensi[];
  };
}

interface AbsensiQueryParams {
  search?: string;
  page?: number;
  take?: number;
}

const useAbsensi = (queryParams: AbsensiQueryParams) => {
  return useQuery({
    queryKey: ['absensi', queryParams.page, queryParams.take, queryParams.search],
    queryFn: async () => {
      const token = await getCookie('access_token');
      const { data } = await axiosInstance.get<AbsensiResponse>(
        '/absensi/getall-attendance',
        {
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      return data.data;
    },
  });
};

export default useAbsensi;
