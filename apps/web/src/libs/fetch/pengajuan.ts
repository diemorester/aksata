import { PengajuanType } from "@/types/pengajuanTypes";
import axiosInstance from "../axios"
import { getCookie } from "../server"

export const pengajuanAbsensiFetch = async (payload: { status: string, startDatePengajuan: string | undefined, endDatePengajuan: string | undefined, keterangan: string }) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.post('/pengajuan', {
        status: payload.status,
        startDate: payload.startDatePengajuan,
        endDate: payload.endDatePengajuan,
        keterangan: payload.keterangan
    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
}

interface PengajuanUserType {
    response: PengajuanType[]
    status: string
}

export const pengajuanUserFetch = async () => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.get<PengajuanUserType>('/pengajuan/get-pengajuan-by-user-id', {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
}