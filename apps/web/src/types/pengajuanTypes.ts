export interface PengajuanType {
    id?: string
    nominal?: number
    tipeLembur?: string
    status?: string
    createdAt?: string
    updatedAt?: string
    startDate: string
    endDate: string
    absensi: {
        status: string
        keterangan: string
    }
}