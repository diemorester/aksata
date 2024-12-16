export interface UserAbsensi {
    id: number,
    name: string
}

export interface Absensi {
    id: string,
    user: UserAbsensi,
    clockIn: string,
    clockOut: string,
    location: string,
    date: string,
    status: Status
}

enum Status {
    Hadir,
    Terlambat,
    Sakit,
    Cuti,
    Izin,
    Alpha
}

export interface AbsensiParams {
    total: number,
    page: number,
    take: number,
    totalPages: number
}