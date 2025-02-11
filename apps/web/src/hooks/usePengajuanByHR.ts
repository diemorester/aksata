"use client"

import axiosInstance from "@/libs/axios"
import { getCookie } from "@/libs/server"
import { PengajuanType } from "@/types/pengajuanTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface PengajuanHRQuery {
    take?: number,
    page?: number,
    search?: string
}

interface PengajuanHRType {
    response: PengajuanType[],
    status: string,
    meta: PengajuanHRQuery
}

const usePengajuanByHR = (params: PengajuanHRQuery) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['pengajuan-HR', params.page, params.search, params.take],
        queryFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.get<PengajuanHRType>('/pengajuan-absensi/get-pengajuan-by-HR', {
                params,
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
            return data
        }
    });

    const revalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ["pengajuan-HR", params.page, params.search, params.take],
        });
    };

    return { ...query, revalidate }
}

export default usePengajuanByHR