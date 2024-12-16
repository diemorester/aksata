'use client'
import { useQuery } from "@tanstack/react-query";
import { Absensi, AbsensiParams } from "@/types/absensiTypes";
import axiosInstance from "@/libs/axios";

interface AbsensiResponse {
    meta: AbsensiParams,
    attendance: Absensi[]
}

interface AbsensiQueryParams {
    search?: string,
    page?: number,
    take?: number
}

export const useAbsensi = (queryParams: AbsensiQueryParams) => {
    
    return useQuery({
        queryKey: ['absensi'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<AbsensiResponse>('/absensi/getall-attendace', {
                params: queryParams
            })
            console.log(data, 'console log dede');
            return data
            
        }
    })
}