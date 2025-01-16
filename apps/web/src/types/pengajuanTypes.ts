export interface PengajuanType {
    id?: string
    status?: string
    createdAt?: string
    updatedAt?: string
    startDate: string
    endDate: string
    absensi: {
        status: "Cuti" | "Sakit" | "Izin"
        keterangan: string
    }
    user?: {
        name: string
        avatar: string | null
    }
}