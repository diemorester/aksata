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

export interface PengajuanLemburPerdinType {
    id: string;
    userId: string;
    nominal: number | null;
    tipePengajuan: 'LemburSatu' | 'LemburDua' | 'LemburTiga' | 'PerjalananDinas';
    date: string;
    createdAt: string;
    updatedAt: string;
    statusPengajuan: 'Waiting' | 'Approved' | 'Rejected';
    keterangan: string;
  };