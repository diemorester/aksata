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