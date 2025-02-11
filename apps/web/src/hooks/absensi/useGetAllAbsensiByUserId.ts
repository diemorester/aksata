'use client';

import axiosInstance from '@/libs/axios';
import { getCookie } from '@/libs/server';
import { useQuery, useQueryClient } from '@tanstack/react-query';

enum Status {
  Hadir = 'Hadir',
  Sakit = 'Sakit',
  Cuti = 'Cuti',
  Izin = 'Izin',
  Alpha = 'Alpha',
}

type Absensi = {
  id: string;
  createdAt: string;
  updatedAt: string;
  clockIn: string;
  clockOut: string;
  isActive: boolean;
  duration: string;
  location: string | null;
  status: Status;
  date: string;
  keterangan: string | null;
  userId: string;
  latitude: number;
  longitude: number;
};

interface ResponseAllAbsensiByUserIdType {
  status: string;
  allAbsensi: Absensi[];
}

const useGetAllAbsensiByUserId = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['all-absensi'],
    queryFn: async () => {
      const token = await getCookie('access_token');
      const { data } = await axiosInstance.get<ResponseAllAbsensiByUserIdType>(
        '/absensi/all-attendance-by-id',
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      return data;
    },
  });
  const revalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['all-absensi'],
    });
  };

  return { ...query, revalidate };
};

export default useGetAllAbsensiByUserId;
