"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { useQuery, useQueryClient } from "@tanstack/react-query"

type Absensi = {
    id: string;
    createdAt: string;
    updatedAt: string;
    clockIn: string;  
    clockOut: string; 
    isActive: boolean;
    duration: string;
    location: string | null;
    status: 'Hadir' | 'Tidak Hadir' | 'Izin' | 'Sakit' | 'Cuti'; 
    date: string;     
    keterangan: string | null;
    userId: string;
};

interface ResponseAbsensiByUserIdType {
    status: string,
    absensi: Absensi
}

const useGetAbsensiByUserId = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['absensi'],
        queryFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.get<ResponseAbsensiByUserIdType>('/absensi/attendance-by-id', {
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            })
            return data
        }
    });
    const revalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ['absensi']
        })
    };

    return { ...query, revalidate }
}

export default useGetAbsensiByUserId