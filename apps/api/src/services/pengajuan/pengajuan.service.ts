import prisma from "@/prisma";
import { PengajuanQuery } from "@/types/pengajuan";
import { Absensi, PengajuanAbsensi } from "@prisma/client";

export const pengajuanService = async (bodyAbsensi: Absensi, bodyPengajuan: PengajuanAbsensi, userId: string) => {
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

        const findApplication = await prisma.pengajuanAbsensi.findFirst({
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

        const application = await prisma.pengajuanAbsensi.create({
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

export const getPengajuanUserService = async (userId: string, query: PengajuanQuery) => {
    try {
        const { page = 1, search, take = 10 } = query;
        const skip = (page - 1) * take;
        const pengajuanUser = await prisma.pengajuanAbsensi.findMany({
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
        const total = await prisma.pengajuanAbsensi.count({
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

export const getPengajuanHRService = async (userId: string, query: PengajuanQuery) => {
    try {
        const { page = 1, search, take = 10 } = query;
        const skip = ( page - 1 ) * take;
        const pengajuanHR = await prisma.pengajuanAbsensi.findMany({
            where: {
                status: 'Waiting'
            },
            include: {
                absensi: {
                    select: {
                        status: true,
                        keterangan: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            },
            take,
            skip
        })
        const total = await prisma.pengajuanAbsensi.count({
            where: {
                userId
            }
        })
        return {
            meta: {
                page,
                total: Math.ceil(total / take),
                take
            }, pengajuanHR
        }
    } catch (error) {
        throw error;
    }
};

export const approvePengajuanRequestService = async (absensiId: string) => {
    try {
        const pengajuan = await prisma.pengajuanAbsensi.findUnique({
            where: { id: absensiId },
            include: {
                absensi: {
                    select: {
                        status: true
                    }
                }
            }
        });

        if (!pengajuan) throw new Error('Pengajuan tidak ditemukan');

        if (pengajuan.status === 'Approved' || pengajuan.status === 'Declined') {
            throw new Error('Pengajuan sudah direspon');
        }

        const approvedPengajuan = await prisma.pengajuanAbsensi.update({
            where: { id: absensiId },
            data: { status: 'Approved' }
        });

        return approvedPengajuan;
    } catch (error) {
        throw error;
    }
};

export const declinePengajuanRequestService = async (absensiId: string) => {
    try {
        const pengajuan = await prisma.pengajuanAbsensi.findUnique({
            where: { id: absensiId },
            include: {
                absensi: {
                    select: {
                        status: true
                    }
                }
            }
        });

        if (!pengajuan) throw new Error('Pengajuan tidak ditemukan');

        if (pengajuan.status === 'Approved' || pengajuan.status === 'Declined') {
            throw new Error('Pengajuan sudah direspon');
        }

        const declinedPengajuan = await prisma.pengajuanAbsensi.update({
            where: { id: absensiId },
            data: { status: 'Declined' }
        });

        return declinedPengajuan
    } catch (error) {
        throw error;
    }
};