"use client"

import axiosInstance from "@/libs/axios";
import { getCookie } from "@/libs/server";
import { useQuery } from "@tanstack/react-query";

const useAbsensiUser = () => {
    return useQuery({
      queryKey: ['absensi-user'],
      queryFn: async () => {
        const token = await getCookie('access_token');
        const { data } = await axiosInstance.get(
          '/absensi/attendance',
          {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        );
        return data.data;
      },
    });
  };
  
  export default useAbsensiUser;