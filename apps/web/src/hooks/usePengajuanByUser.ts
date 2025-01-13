"use client"

import axiosInstance from "@/libs/axios"
import { getCookie } from "@/libs/server"
import { PengajuanType } from "@/types/pengajuanTypes"
import { useQuery } from "@tanstack/react-query"

interface PengajuanQuery {
    take?: number
    page?: number
    search?: string
}

interface PengajuanUserType {
    response: PengajuanType[]
    status: string
    meta: PengajuanQuery
}

const usePengajuanByUser = (params: PengajuanQuery) => {
    return useQuery({
        queryKey: ['pengajuan-user', params.page, params.search, params.take],
        queryFn: async () => {
            const token = await getCookie('access_token');
            const { data } = await axiosInstance.get<PengajuanUserType>('/pengajuan/get-pengajuan-by-user-id', {
                params,
                headers: {
                    Authorization: `Bearer ${token?.value}`
                }
            }
            )
            return data.response
        }
    })
}

export default usePengajuanByUser