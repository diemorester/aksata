"use client"

import { pengajuanUserFetch } from "@/libs/fetch/pengajuan"
import { useQuery } from "@tanstack/react-query"

const usePengajuanByUser = () => {
    return useQuery({
        queryKey: ['pengajuan-user'],
        queryFn: async () => {
            const { data } = await pengajuanUserFetch()
            return data.response
        }
    })
}

export default usePengajuanByUser