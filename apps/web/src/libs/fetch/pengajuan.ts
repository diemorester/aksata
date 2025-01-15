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
};

export const approvePengajuanFetch = async (absensiId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan/approve-pengajuan/${absensiId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};

export const declinePengajuanFetch = async (absensiId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan/decline-pengajuan/${absensiId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};