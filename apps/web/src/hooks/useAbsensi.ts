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
  filterBy?: string;
}

const useAbsensi = (queryParams: AbsensiQueryParams) => {
  return useQuery({
    queryKey: ['absensi', queryParams.page, queryParams.take, queryParams.search, queryParams.filterBy],
    queryFn: async () => {
      const token = await getCookie('access_token');
      const { data } = await axiosInstance.get<AbsensiResponse>(
        '/absensi/attendances',
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
