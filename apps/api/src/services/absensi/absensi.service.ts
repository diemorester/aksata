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

    if (existingAttendace) throw new Error('Anda sudah melakukan clock-in hari ini');

    const batasJamMasuk = new Date();
    batasJamMasuk.setHours(8, 30, 0, 0);
    const status = now <= batasJamMasuk ? 'Hadir' : 'Terlambat';

    const clockIn = await prisma.absensi.create({
      data: {
        userId,
        clockIn: new Date(),
        status,
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

    if (!attendance) throw new Error('Anda belum melakukan clock-in hari ini.');

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
    const { search, take = 9, page = 1, filterBy } = query;
    const now = new Date();
    const skip = (page - 1) * take;

    let startDate: Date | undefined
    let endDate: Date | undefined

    if (filterBy === 'daily') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1)
    } else if (filterBy === 'weekly') {
      const dayOfWeek = now.getDay();
      startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0)
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7)
    } else if (filterBy === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    } else if (filterBy === 'yearly') {
      startDate = new Date(now.getFullYear(), 0, 1)
      endDate = new Date(now.getFullYear() + 1, 0, 1);
    }

    const attendance = await prisma.absensi.findMany({
      where: {
        user: {
          name: {
            contains: search,
          },
        },
        date: {
          lte: endDate,
          gte: startDate
        }
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
        date: {
          gte: startDate,
          lte: endDate
        }
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

export const autoAlphaAttendance = async () => {
  try {
    const users = await prisma.user.findMany();

    for (const user of users) {
      const existingAttendace = await prisma.absensi.findFirst({
        where: {
          userId: user.id,
          clockIn: {
            gte: startDay,
            lte: endDay,
          },
        },
      });

      if (!existingAttendace && user.role === "User") {
        await prisma.absensi.create({
          data: {
            userId: user.id,
            clockIn: null,
            clockOut: null,
            status: 'Alpha',
          },
        });
      }
    }

    console.log('Auto set alpha completed');
  } catch (error) {
    throw error;
  }
};
