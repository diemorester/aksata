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

export const approvePengajuanAbsensiFetch = async (absensiId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan-absensi/approve-pengajuan/${absensiId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};

export const declinePengajuanAbsensiFetch = async (absensiId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan-absensi/decline-pengajuan/${absensiId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};

export const approvePengajuanLemburPerdinFetch = async (pengajuanId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan-lembur-perdin/approve-pengajuan/${pengajuanId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};

export const declinePengajuanLemburPerdinFetch = async (pengajuanId: string) => {
    const token = await getCookie('access_token');
    const res = await axiosInstance.patch(`/pengajuan-lembur-perdin/decline-pengajuan/${pengajuanId}`, {

    }, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    )
    return res
};