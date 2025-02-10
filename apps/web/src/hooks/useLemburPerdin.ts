"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PengajuanLemburPerdinType {
    date: string | undefined;
    keterangan: string;
    tipePengajuan: string;
    durationHours?: number;
}

const useLemburPerdin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PengajuanLemburPerdinType)=> {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.post('/pengajuan-lembur-perdin/ajukan',
                {
                    date: payload.date,
                    keterangan: payload.keterangan,
                    tipePengajuan: payload.tipePengajuan,
                    durationHours: payload.durationHours
                },
                {
                    headers: {
                        Authorization: `Bearer ${token?.value}`
                    }
                },
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['pengajuan-lembur']})
        }
    })
}

export default useLemburPerdin