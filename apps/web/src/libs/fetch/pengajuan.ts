import axiosInstance from "../axios"
import { getCookie } from "../server"

export const pengajuanAbsensiFetch = async (payload: { status: string, startDatePengajuan: string | undefined, endDatePengajuan: string | undefined, keterangan: string }) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.post('/pengajuan', {
        status: payload.status,
        startDatePengajuan: payload.startDatePengajuan,
        endDatePengajuan: payload.endDatePengajuan,
        keterangan: payload.keterangan
    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
}