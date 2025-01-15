"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { PieChartType } from "@/types/chartType";
import { useQuery } from "@tanstack/react-query"

const usePieUser = () => {
    return useQuery({
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
}

export default usePieUser