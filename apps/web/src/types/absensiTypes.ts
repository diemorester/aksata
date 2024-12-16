export interface IAbsensi {
    name: string,
    status: Status,
    clockIn?: Date | null,
    clockOut?: Date | null
}

enum Status {
    Hadir,
    Terlambat,
    Sakit,
    Cuti,
    Izin,
    Alpha
}

export interface AbsensiResponse {
    absensi: IAbsensi[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface UseAbsensiParams {
    userId: number;
    page: number;
    limit: number;
    search?: string;
}