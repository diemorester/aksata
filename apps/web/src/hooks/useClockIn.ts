"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const usePostClockIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.post('/absensi/clock-in',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token?.value}`
                    },
                },
            );
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['pie-chart']})
        }
    })
};

export default usePostClockIn;