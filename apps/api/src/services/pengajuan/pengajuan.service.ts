import prisma from "@/prisma";
import { Absensi } from "@prisma/client";

export const pengajuanService = async (body: Absensi, userId: number) => {
    try {
        const { status, startDatePengajuan, endDatePengajuan, keterangan } = body
        if (!status || !startDatePengajuan || !endDatePengajuan || !keterangan) {
            throw new Error('Pengajuan tidak boleh kosong')
        }
        const startDate = new Date(startDatePengajuan!);
        const endDate = new Date(endDatePengajuan!)
        if (endDate < startDate) {
            throw new Error('End date tidak boleh sebelum start date')
        }
        const findPengajuan = await prisma.absensi.findFirst({
            where: {
                OR: [
                    {
                        startDatePengajuan: {
                            lte: startDate
                        },
                        endDatePengajuan: {
                            gte: endDate
                        }
                    }
                ]
            }
        })
        if (findPengajuan) {
            throw new Error('anda telah melakukan pengajuan, silakan pilih tanggal lain')
        }
        const pengajuan = await prisma.absensi.create({
            data: {
                status, startDatePengajuan, endDatePengajuan, userId, keterangan
            }
        })
        return pengajuan;
    } catch (error) {
        throw error;
    }
}