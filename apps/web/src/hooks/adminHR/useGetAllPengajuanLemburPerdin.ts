'use client'

import axiosInstance from "@/libs/axios"
import { getCookie } from "@/libs/server";
import { PengajuanLemburPerdinType } from "@/types/pengajuanTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface ResponseGetAllPengajuanLemburPerdin {
    status: string;
    response: PengajuanLemburPerdinType[]
}

const useGetAllPengajuanLemburPerdin = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['all-pengajuan-perdin-lembur'],
        queryFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.get<ResponseGetAllPengajuanLemburPerdin>('/pengajuan-lembur-perdin/all-pengajuan', {
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
            return data
        }
    });

    const revalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ['all-pengajuan-perdin-lembur']
        })
    };

    return {...query, revalidate}
};

export default useGetAllPengajuanLemburPerdin;