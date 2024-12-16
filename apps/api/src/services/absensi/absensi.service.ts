import prisma from '@/prisma';

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

    const clockIn = await prisma.absensi.create({
      data: {
        userId,
        clockIn: new Date(),
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