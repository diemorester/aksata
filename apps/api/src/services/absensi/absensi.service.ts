import { convertDate } from '@/helpers/convertDate';
import { durationCounter } from '@/helpers/durationCounter';
import prisma from '@/prisma';
import { AbsensiQuery } from '@/types/absensi';
import * as ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

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

    if (existingAttendace)
      throw new Error('Anda sudah melakukan clock-in hari ini');

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

    const updateClockOut = await prisma.absensi.update({
      where: {
        id: attendance.id,
      },
      data: {
        userId,
        clockOut: new Date(),
      },
    });

    const duration = durationCounter(
      updateClockOut.clockIn,
      updateClockOut.clockOut,
    );
    const clockOut = await prisma.absensi.update({
      where: {
        id: attendance.id,
      },
      data: {
        duration,
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

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (filterBy === 'daily') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    } else if (filterBy === 'weekly') {
      const dayOfWeek = now.getDay();
      startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
    } else if (filterBy === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else if (filterBy === 'yearly') {
      startDate = new Date(now.getFullYear(), 0, 1);
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
          gte: startDate,
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
        date: {
          gte: startDate,
          lte: endDate,
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

      if (!existingAttendace && user.role === 'User') {
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

export const autoClockOutAttendance = async () => {
  try {
    const attendance = await prisma.absensi.findMany({
      where: {
        clockOut: null,
        user: {
          role: 'User',
        },
        clockIn: {
          not: null,
        },
      },
    });

    for (const attend of attendance) {
      const durationTime = await prisma.absensi.update({
        where: {
          id: attend.id,
        },
        data: {
          clockOut: new Date(),
        },
      });

      const duration = durationCounter(
        durationTime.clockIn,
        durationTime.clockOut,
      );

      await prisma.absensi.update({
        where: {
          id: attend.id,
        },
        data: {
          duration,
        },
      });
    }
    console.log('Auto Clock-out complete');
  } catch (error) {
    throw error;
  }
};

export const exportExcelService = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet: ExcelJS.Worksheet = workbook.addWorksheet('Absensi');

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 20);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(19);

    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const monthYear = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()} - ${endDate.toLocaleString('default', { month: 'long' })} ${endDate.getFullYear()}`;

    sheet.getCell('B1').value = monthYear;
    sheet.getCell('B1').alignment = { horizontal: 'center' };
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { horizontal : 'center' };

    const columns = [
      { header: 'Nama', key: 'name', width: 20 },
      ...dates.map((date, i) => ({
        header: `${date.getDate()}`,
        key: `day${i + 1}`,
        width: 7,
      })),
      { header: 'Jumlah Hari Kerja', key: 'workDays', width: 15 },
      { header: 'Keterangan', key: 'remarks', width: 20 },
    ];

    sheet.columns = columns;

    const attendance = await prisma.absensi.findMany({
      include: {
        user: true,
      },
    });

    const userRows: Record<string, any> = {};

    attendance.forEach((attend) => {
      const userId = attend.user.id;
      if (!userRows[userId]) {
        userRows[userId] = {
          name: attend.user.name,
          workDays: 0,
          remarks: '',
        };
        dates.forEach((_, i) => {
          userRows[userId][`day${i + 1}`] = '-';
        });
      }

      const attendDate = new Date(attend.clockIn!);
      const dayIndex = dates.findIndex(date => date.toDateString() === attendDate.toDateString());
      if (dayIndex !== -1) {
        userRows[userId][`day${dayIndex + 1}`] = attend.status;
        if (attend.status === 'Hadir' || attend.status === 'Terlambat') {
          userRows[userId].workDays += 1;
        }
      }
    });

    Object.values(userRows).forEach((row: string[], index: number) => {
      const rowIndex = index + 2;
      sheet.addRow(row).commit();
      const rowCells = sheet.getRow(rowIndex);
      rowCells.alignment = { horizontal: 'center' };
    });

    // sheet.getRow(2).alignment = { horizontal: 'center' };
    sheet.getColumn(1).alignment = { horizontal: 'left' };

    const buffer = await workbook.xlsx.writeBuffer();
    const templatePath = path.join(__dirname, '../../../public/excel', 'absensi.xlsx');
    fs.writeFileSync(templatePath, buffer as any);

    return buffer;
  } catch (error) {
    throw error;
  }
};