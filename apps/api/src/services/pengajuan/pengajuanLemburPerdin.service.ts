import { getDateRange } from "@/helpers/dateRange";
import prisma from "@/prisma";
import { OpsiPengajuan, Pengajuan } from "@prisma/client";
import { ObjectId } from 'mongodb';

export const pengajuanLemburPerdinService = async (body: Pengajuan, userId: string) => {
    try {
        const { tipePengajuan, date, keterangan, durationHours, kota } = body;

        if (![OpsiPengajuan.Lembur, OpsiPengajuan.PerjalananDinas].includes(tipePengajuan as OpsiPengajuan)) {
            throw new Error('Tipe Pengajuan tydac valid');
        }

        const existingPengajuan = await prisma.pengajuan.findMany({
            where: {
                userId,
                date
            },
        });

        const hasLembur = existingPengajuan.some((p) => p.tipePengajuan === OpsiPengajuan.Lembur);
        const hasPerdin = existingPengajuan.some((p) => p.tipePengajuan === OpsiPengajuan.PerjalananDinas);

        if (tipePengajuan === OpsiPengajuan.Lembur) {
            if (hasLembur) {
                throw new Error('Hanya boleh mengajukan 1 Lembur per hari');
            }
            if (!durationHours || durationHours <= 0) {
                throw new Error('Durasi Lembur tidak boleh kurang dari 1 jam per hari');
            }
            if (durationHours > 7) {
                throw new Error('Durasi Lembur tidak boleh lebih dari 7 jam per hari');
            }
            if (kota) {
                throw new Error('Kota hanya untuk Pengajuan Dinas');
            }
            if (!keterangan) {
                throw new Error('Keterangan tidak boleh kosong')
            }
        }

        if (tipePengajuan === OpsiPengajuan.PerjalananDinas) {
            if (hasPerdin) {
                throw new Error('Hanya boleh mengajukan 1 Perdin per hari');
            }
            if (!kota) {
                throw new Error('Kota tujuan Perjalanan Dinas tidak boleh kosong');
            }
            if (!keterangan) {
                throw new Error('Keterangan tidak boleh kosong')
            }
        }

        const pengajuan = await prisma.pengajuan.create({
            data: {
                userId,
                date,
                keterangan,
                tipePengajuan,
                durationHours: tipePengajuan === OpsiPengajuan.Lembur ? durationHours : null,
                kota: tipePengajuan === OpsiPengajuan.PerjalananDinas ? kota : null
            },
        });

        return pengajuan
    } catch (error) {
        throw error;
    }
};

export const getAllPengajuanLemburService = async (userId: string) => {
    try {
        const allPengajuan = await prisma.pengajuan.findMany({
            where: {
                userId,
                statusPengajuan: 'Waiting'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                    }
                }
            }
        });
        return allPengajuan
    } catch (error) {
        throw error;
    };
};

export const getAllUserService = async () => {
    try {
        const allUser = await prisma.user.findMany({
            where: {
                role: 'User',
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                phone: true,
            },
            orderBy: {
                name: 'asc'
            },
        });
        return allUser;
    } catch (error) {
        throw error;
    }
};

export const getPengajuanLemburPerdinByUserIdService = async (
    userId: string,
    filterType: 'Monthly' | 'Yearly'
) => {
    try {
        if (!ObjectId.isValid(userId)) {
            throw new Error('UserID tidak valid');
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                name: true,
                avatar: true,
                email: true,
                phone: true
            }
        })

        if (!user) throw new Error('User tydac ditemukan');

        const { startUTC, endUTC } = getDateRange(filterType);

        const pengajuanUser = await prisma.pengajuan.findMany({
            where: {
                userId,
                statusPengajuan: 'Approved',
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
            orderBy: {
                date: 'asc'
            }
        });

        const totalHours = await prisma.pengajuan.aggregate({
            where: {
                userId,
                statusPengajuan: 'Approved',
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
            _sum: {
                durationHours: true,
            },
        });

        const totalLembur = await prisma.pengajuan.count({
            where: {
                userId,
                statusPengajuan: 'Approved',
                tipePengajuan: 'Lembur',
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
        });

        const totalPerjalananDinas = await prisma.pengajuan.count({
            where: {
                userId,
                statusPengajuan: 'Approved',
                tipePengajuan: 'PerjalananDinas',
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
        });

        const totalPengajuan = await prisma.pengajuan.count({
            where: {
                userId,
                statusPengajuan: 'Approved',
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
        });

        return {
            user,
            pengajuanUser,
            totalHours: totalHours._sum.durationHours || 0,
            totalLembur,
            totalPerjalananDinas,
            totalPengajuan
        };
    } catch (error) {
        throw error;
    }
};

export const approvePengajuanLemburPerdinService = async (pengajuanId: string) => {
    try {
        const pengajuan = await prisma.pengajuan.findUnique({
            where: { id: pengajuanId }
        })

        if (!pengajuan) {
            throw new Error('Pengajuan tidak ditemukan')
        };

        if (pengajuan.statusPengajuan === 'Approved' || pengajuan.statusPengajuan === 'Declined') {
            throw new Error('Pengajuan sudah direspon')
        };

        const approvedPengajuan = await prisma.pengajuan.update({
            where: { id: pengajuanId },
            data: {
                statusPengajuan: 'Approved'
            }
        })

        return approvedPengajuan
    } catch (error) {
        throw error;
    }
};