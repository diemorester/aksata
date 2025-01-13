import prisma from "@/prisma";
import { PengajuanQuery } from "@/types/pengajuan";
import { Absensi, Pengajuan } from "@prisma/client";

export const pengajuanService = async (bodyAbsensi: Absensi, bodyPengajuan: Pengajuan, userId: number) => {
    try {
        const { status, keterangan } = bodyAbsensi
        const { startDate, endDate } = bodyPengajuan
        if (!status) {
            throw new Error('Status tidak boleh kosong')
        }
        
        if (!startDate) {
            throw new Error('Tanggal Mulai tidak boleh kosong')
        }

        if (!endDate) {
            throw new Error('Tanggal Selesai tidak boleh kosong')
        }

        if (!keterangan) {
            throw new Error('Keterangan tidak boleh kosong')
        }

        const findApplication = await prisma.pengajuan.findFirst({
            where: {
                userId,
                OR: [
                    {
                        startDate: {
                            lte: new Date(startDate)
                        },
                        endDate: {
                            gte: new Date(endDate)
                        }
                    }
                ]
            }
        })

        if (findApplication) {
            throw new Error('Anda telah melakukan pengajuan, silakan pilih tanggal lain')
        }

        const attendance = await prisma.absensi.create({
            data: {
                userId,
                status,
                keterangan
            }
        })

        const application = await prisma.pengajuan.create({
            data: {
                userId,
                absensiId: attendance.id,
                startDate,
                endDate
            }
        })
        return { attendance, application }

    } catch (error) {
        throw error;
    }
};

export const getPengajuanUserService = async (userId: number, query: PengajuanQuery) => {
    try {
        const { page = 1, search, take = 10 } = query;
        const skip = (page - 1) * take;
        const pengajuanUser = await prisma.pengajuan.findMany({
            where: {
                userId
            },
            include: {
                absensi: {
                    select: {
                        status: true,
                        keterangan: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take,
            skip,
        })
        const total = await prisma.pengajuan.count({
            where: {
                userId
            }
        })
        return {
            meta: {
                page,
                total: Math.ceil(total / take),
                take
            }, pengajuanUser
        }
    } catch (error) {
        throw error;
    }
};

export const getPengajuanHRService = async () => {
    try {
        const pengajuanHR = await prisma.pengajuan.findMany({
            include: {
                absensi: {
                    select: {
                        status: true,
                        keterangan: true
                    }
                }
            }
        })
        return pengajuanHR
    } catch (error) {
        throw error;
    }
};