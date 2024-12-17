import prisma from '@/prisma';
import { AbsensiQuery } from '@/types/absensi';

const now = new Date();
const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endDay = new Date(startDay);
endDay.setDate(startDay.getDate() + 1);

export const clockInService = async (userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('user not found');

    const existingAttendace = await prisma.absensi.findFirst({
      where: {
        userId,
        clockIn: {
          gte: startDay,
          lte: endDay,
        },
      },
    });
    
    if (existingAttendace) throw new Error('anda sudah clock-in hari ini');

    const batasJamMasuk = new Date();
    batasJamMasuk.setHours(8, 3, 0, 0)
    const status = now <= batasJamMasuk? 'Hadir' : 'Terlambat'

    const clockIn = await prisma.absensi.create({
      data: {
        userId,
        clockIn: new Date(),
        status
      },
    });

    return clockIn;
  } catch (error) {
    throw error;
  }
};

export const clockOutService = async (userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('user not found');

    const attendance = await prisma.absensi.findFirst({
      where: {
        userId,
        clockIn: {
          gte: startDay,
          lte: endDay,
        },
      },
    });

    if (!attendance) throw new Error('Anda belum clock-in hari ini.');

    if (attendance.clockOut !== null) {
      throw new Error('Anda sudah melakukan clock-out hari ini.');
    }

    const clockOut = await prisma.absensi.update({
      where: {
        id: attendance.id,
      },
      data: {
        userId,
        clockOut: new Date(),
      },
    });

    return clockOut;
  } catch (error) {
    throw error;
  }
};

export const getAllAttendanceService = async (query: AbsensiQuery) => {
  try {
    const { search, take = 10, page = 1 } = query;

    const skip = (page - 1) * take;

    const attendance = await prisma.absensi.findMany({
      where: {
        user: {
          name: {
            contains: search,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.absensi.count({
      where: {
        user: {
          name: {
            contains: search,
          },
        },
      },
    });

    return {
      meta: {
        total,
        page,
        take,
        totalPages: Math.ceil(total / take),
      },
      attendance,
    };
  } catch (error) {
    throw error;
  }
};
