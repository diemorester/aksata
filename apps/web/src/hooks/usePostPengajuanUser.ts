"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const usePostPengajuanUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { status: string, startDatePengajuan: string | undefined, endDatePengajuan: string | undefined, keterangan: string }) => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.post('/pengajuan-absensi', {
                status: payload.status,
                startDate: payload.startDatePengajuan,
                endDate: payload.endDatePengajuan,
                keterangan: payload.keterangan
            }, {
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['pengajuan-user']
            })
        }
    });
};

export default usePostPengajuanUser