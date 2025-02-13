"use client"

import axiosInstance from "@/libs/axios"
import { PengajuanLemburPerdinType } from "@/types/pengajuanTypes";
import { useQuery } from "@tanstack/react-query"

interface ResponseGetUserById {
    status: string;
    pengajuanUser: PengajuanLemburPerdinType[]
    user: {
      name: string;
      avatar: string;
      email: string;
      phone: string;
    };
    totalHours: number;
    totalLembur: number;
    totalPerjalananDinas: number;
    totalPengajuan: number;
}

const useGetPengajuanLemburPerdinByUserId = (userId: string, filterType: 'Monthly' | 'Yearly') => {
  return useQuery({
    queryKey: ['get-user', userId, filterType],
    queryFn: async () => {
        const { data } = await axiosInstance.get<ResponseGetUserById>(`/pengajuan-lembur-perdin/${userId}?filterType=${filterType}`)
        return data
    }
  })
}

export default useGetPengajuanLemburPerdinByUserId