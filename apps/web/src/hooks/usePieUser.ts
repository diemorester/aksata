"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { PieChartType } from "@/types/chartType";
import { useQuery, useQueryClient } from "@tanstack/react-query"

const usePieUser = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['pie-chart'],
        queryFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.get<PieChartType>('/absensi/attendance', {
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
            return data
        }
    });
    const revalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ['pie-chart']
        })
    };

    return {...query, revalidate}
}

export default usePieUser