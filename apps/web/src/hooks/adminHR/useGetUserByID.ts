"use client"

import axiosInstance from "@/libs/axios"
import { PengajuanLemburPerdinType } from "@/types/pengajuanTypes";
import { useQuery } from "@tanstack/react-query"

interface ResponseGetUserById {
    status: string;
    response: PengajuanLemburPerdinType[]
}

const useGetUserByID = (userId: string) => {
  return useQuery({
    queryKey: ['get-user', userId],
    queryFn: async () => {
        const { data } = await axiosInstance.get<ResponseGetUserById>(`/admin-hr/${userId}`)
        return data
    }
  })
}

export default useGetUserByID