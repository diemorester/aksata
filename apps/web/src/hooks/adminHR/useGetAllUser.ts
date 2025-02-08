"use client"

import axiosInstance from "@/libs/axios"
import { AllUserType } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query"

interface ResponseGetUser {
    status: string;
    response: AllUserType[];
}

const useGetAllUser = () => {
    return useQuery({
        queryKey: ['get-all-users'],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ResponseGetUser>('/pengajuan-lembur-perdin/users')
            return data
        }
    })
}

export default useGetAllUser