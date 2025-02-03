import { excelDateFormat, hourFormat } from '@/helpers/convertDate';
import { durationCounter } from '@/helpers/durationCounter';
import prisma from '@/prisma';
import { AbsensiQuery } from '@/types/absensi';
import * as ExcelJS from 'exceljs';

// const now = new Date();
// const startDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
// const endDay = new Date(startDay);
// endDay.setUTCDate(startDay.getUTCDate() + 1);

const now = new Date();

const wibOffset = 7 * 60 * 60 * 1000;

const startDay = new Date(
  Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )
);
startDay.setTime(startDay.getTime() + wibOffset);

const endDay = new Date(startDay);
endDay.setUTCDate(startDay.getUTCDate() + 1);
endDay.setTime(endDay.getTime() - 1);

export const clockInService = async (userId: string) => {
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

    const clockIn = await prisma.absensi.create({
      data: {
        userId,
        clockIn: new Date(),
        status: 'Hadir',
      },
    });

    return clockIn;
  } catch (error) {
    throw error;
  }
};

export const clockOutService = async (userId: string) => {
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

export const pieData = async (userId: string) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const cutoffDayStart = 21;
    const cutoffDayEnd = 20;

    let cutoffStart: Date;
    let cutoffEnd: Date;

    if (today.getDate() >= cutoffDayStart) {
      cutoffStart = new Date(year, month, cutoffDayStart);
      cutoffStart.setHours(0, 0, 0, 0); // Set waktu menjadi pukul 00:00:00
      cutoffEnd = new Date(year, month + 1, cutoffDayEnd);
      cutoffEnd.setHours(23, 59, 59, 999); // Set waktu menjadi pukul 23:59:59
    } else {
      cutoffStart = new Date(year, month - 1, cutoffDayStart);
      cutoffStart.setHours(0, 0, 0, 0); // Set waktu menjadi pukul 00:00:00
      cutoffEnd = new Date(year, month, cutoffDayEnd);
      cutoffEnd.setHours(23, 59, 59, 999); // Set waktu menjadi pukul 23:59:59
    }

    const sakit = await prisma.absensi.findMany({
      where: {
        userId,
        status: 'Sakit',
        pengajuan: {
          every: {
            status: 'Approved',
            startDate: {
              gte: cutoffStart
            },
            endDate: {
              lte: cutoffEnd
            }
          },
        },
      },
    });
    const izin = await prisma.absensi.findMany({
      where: {
        userId,
        status: 'Izin',
        pengajuan: {
          every: {
            status: 'Approved',
            startDate: {
              gte: cutoffStart
            },
            endDate: {
              lte: cutoffEnd
            }
          },
        },
      },
    });
    const cuti = await prisma.absensi.findMany({
      where: {
        userId,
        status: 'Cuti',
        pengajuan: {
          every: {
            status: 'Approved',
            startDate: {
              gte: cutoffStart,
            },
            endDate: {
              lte: cutoffEnd,
            }
          },
        },
      },
    });
    const hadir = await prisma.absensi.findMany({
      where: {
        userId,
        status: 'Hadir',
        date: {
          gte: cutoffStart,
          lte: cutoffEnd,
        },
      },
    });
    const alpha = await prisma.absensi.findMany({
      where: {
        userId,
        status: 'Alpha',
        date: {
          gte: cutoffStart,
          lte: cutoffEnd,
        },
      },
    });

    const total = await prisma.absensi.findMany({
      where: {
        userId,
        date: {
          gte: cutoffStart,
          lte: cutoffEnd,
        },
        pengajuan: {
          every: {
            status: 'Approved',
            OR: [
              {
                startDate: {
                  gte: cutoffStart,
                  lte: cutoffEnd
                },
              },
              {
                endDate: {
                  gte: cutoffStart,
                  lte: cutoffEnd
                },
              },
            ]
          }
        }
      },
    });

    return {
      hadir: hadir.length,
      cuti: cuti.length,
      izin: izin.length,
      sakit: sakit.length,
      alpha: alpha.length,
      total: total.length,
    };
  } catch (error) {
    throw error;
  }
};

export const getAllAttendanceService = async (query: AbsensiQuery) => {
  try {
    const { search, take = 9, page = 1, filterBy } = query;
    const now = new Date();
    const skip = (page - 1) * take;

    let cutoffStart: Date | undefined;
    let cutoffEnd: Date | undefined;

    // Menentukan rentang cutoff
    if (now.getDate() >= 21) {
      // Kalau tanggal sekarang >= 21, periode mulai 21 bulan ini sampai 20 bulan depan
      cutoffStart = new Date(now.getFullYear(), now.getMonth(), 21, 0, 0, 0, 0); // 21 bulan ini
      cutoffEnd = new Date(now.getFullYear(), now.getMonth() + 1, 20, 23, 59, 59, 999); // Sampai 20 bulan depan, jam 23:59:59.999
    } else {
      // Kalau tanggal sekarang < 21, periode mulai 21 bulan lalu sampai 20 bulan ini
      cutoffStart = new Date(now.getFullYear(), now.getMonth() - 1, 21, 0, 0, 0, 0); // 21 bulan lalu
      cutoffEnd = new Date(now.getFullYear(), now.getMonth(), 20, 23, 59, 59, 999); // Sampai 20 bulan ini, jam 23:59:59.999
    }

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
      startDate = new Date(cutoffStart);
      endDate = new Date(cutoffEnd);
    } else if (filterBy === 'yearly') {
      // startDate = new Date(now.getFullYear(), 0, 0);
      // endDate = new Date(now.getFullYear() + 1, 0, 20);
      const fiscalYearStart = (startDay.getMonth() > 0 || (startDay.getMonth() === 0 && startDay.getDate() >= 21))
        ? new Date(startDay.getFullYear(), 0, 21, 0, 0, 0, 0) // 21 Januari tahun ini (WIB)
        : new Date(startDay.getFullYear() - 1, 0, 21, 0, 0, 0, 0); // 21 Januari tahun lalu (WIB)

      const fiscalYearEnd = new Date(fiscalYearStart.getFullYear() + 1, 0, 20, 23, 59, 59, 999); // 20 Januari tahun berikutnya (WIB)

      startDate = fiscalYearStart;
      endDate = fiscalYearEnd;
    };

    // startDate = startDate && startDate < cutoffStart ? cutoffStart : startDate;
    // endDate = endDate && endDate > cutoffEnd ? cutoffEnd : endDate;
    if (startDate && startDate < cutoffStart!) {
      startDate = cutoffStart
    };
    if (endDate && endDate > cutoffEnd!) {
      endDate = cutoffEnd
    };

    const attendance = await prisma.absensi.findMany({
      where: {
        user: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
        pengajuan: {
          every: {
            status: 'Approved',
            OR: [
              {
                startDate: {
                  gte: cutoffStart,
                  lte: cutoffEnd
                },
              },
              {
                endDate: {
                  gte: cutoffStart,
                  lte: cutoffEnd
                },
              },
            ]
          },
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
        pengajuan: {
          select: {
            startDate: true,
            endDate: true
          }
        }
      },
    });

    const total = await prisma.absensi.count({
      where: {
        user: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
        pengajuan: {
          every: {
            status: 'Approved',
            OR: [
              {
                startDate: {
                  gte: startDate,
                  lte: endDate
                },
              },
              {
                endDate: {
                  gte: startDate,
                  lte: endDate
                },
              },
            ]
          },
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
          date: {
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
  } catch (error) {
    throw error;
  }
};

export const exportExcelService = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet: ExcelJS.Worksheet = workbook.addWorksheet('Absensi');

    // No.
    sheet.getCell('A1').font = { bold: true, size: 12 };
    sheet.getCell('A1').value = 'No.'
    sheet.getCell('A1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('A').width = 5
    sheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Nama
    sheet.getCell('B1').font = { bold: true, size: 12 }
    sheet.getCell('B1').value = 'Nama'
    sheet.getCell('B1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('B').width = 15
    sheet.getCell('B1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Tanggal
    sheet.getCell('C1').font = { bold: true, size: 12 };
    sheet.getCell('C1').value = 'Tanggal'
    sheet.getCell('C1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('C').width = 20
    sheet.getCell('C1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Jam Masuk
    sheet.getCell('D1').font = { bold: true, size: 12 };
    sheet.getCell('D1').value = 'Jam Masuk'
    sheet.getCell('D1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('D').width = 15
    sheet.getCell('D1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Jam Pulang
    sheet.getCell('E1').font = { bold: true, size: 12 };
    sheet.getCell('E1').value = 'Jam Pulang'
    sheet.getCell('E1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('E').width = 15
    sheet.getCell('E1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Durasi
    sheet.getCell('F1').font = { bold: true, size: 12 };
    sheet.getCell('F1').value = 'Durasi'
    sheet.getCell('F1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('F').width = 15
    sheet.getCell('F1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Status
    sheet.getCell('G1').font = { bold: true, size: 12 };
    sheet.getCell('G1').value = 'Status'
    sheet.getCell('G1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('G').width = 18
    sheet.getCell('G1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // Keterangan
    sheet.getCell('H1').font = { bold: true, size: 12 };
    sheet.getCell('H1').value = 'Keterangan'
    sheet.getCell('H1').alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    sheet.getColumn('H').width = 30
    sheet.getCell('H1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const data = await prisma.absensi.findMany({
      where: {
        pengajuan: {
          every: {
            status: 'Approved'
          }
        }
      },
      include: {
        user: {
          select: {
            name: true
          },
        },
        pengajuan: {
          select: {
            startDate: true,
            endDate: true,
            status: true
          }
        }
      },
      orderBy: {
        user: {
          name: 'asc'
        }
      }
    })

    data.forEach((item, index, array) => {
      const customRow = sheet.getRow(index + 2);
      const lastRow = sheet.getRow((array.length - 1) + 2);

      // nomer
      const cellNumber = customRow.getCell(1);
      const lastNumber = lastRow.getCell(1);
      cellNumber.value = index + 1
      cellNumber.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellNumber.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastNumber.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // nama
      const cellName = customRow.getCell(2);
      const lastName = lastRow.getCell(2);
      cellName.value = item.user.name
      cellName.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastName.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // tanggal
      let penampungStart = ""
      let penampungEnd = ""
      item.pengajuan.map((item) => {
        penampungStart += item.startDate
        penampungEnd += item.endDate
      })
      const cellDate = customRow.getCell(3);
      const lastDate = lastRow.getCell(3);
      cellDate.value = item.status === 'Izin' ? `${penampungStart} - ${penampungEnd}` : item.status === 'Sakit' ? `${penampungStart} - ${penampungEnd}` : item.status === 'Cuti' ? `${excelDateFormat(penampungStart)} - ${excelDateFormat(penampungEnd)}` : item.date
      cellDate.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellDate.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastDate.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // jam masuk
      const cellClockIn = customRow.getCell(4);
      const lastClockIn = lastRow.getCell(4);
      cellClockIn.value = hourFormat(item.clockIn);
      cellClockIn.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellClockIn.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastClockIn.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // jam keluar
      const cellClockOut = customRow.getCell(5);
      const lastClockOut = lastRow.getCell(5);
      cellClockOut.value = hourFormat(item.clockOut);
      cellClockOut.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellClockOut.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastClockOut.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // durasi
      const cellDuration = customRow.getCell(6);
      const lastDuration = lastRow.getCell(6);
      cellDuration.value = item.duration ? `${item.duration?.split(':')[0]?.padStart(2, '0')}:${item.duration?.split(':')[1]?.padStart(2, '0')}` : '-';
      cellDuration.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellDuration.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastDuration.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // status
      const cellStatus = customRow.getCell(7);
      const lastStatus = lastRow.getCell(7);
      cellStatus.value = item.status;
      cellStatus.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellStatus.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastStatus.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }

      // keterangan
      const cellKeterangan = customRow.getCell(8);
      const lastKeterangan = lastRow.getCell(8);
      cellKeterangan.value = item.keterangan || '-';
      cellKeterangan.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cellKeterangan.border = {
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      lastKeterangan.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' }
      }
    })

    const buffer = await workbook.xlsx.writeBuffer();
    // const templatePath = path.join(
    //   __dirname,
    //   '../../../public/excel',
    //   'absensi.xlsx',
    // );
    // fs.writeFileSync(templatePath, buffer as any);

    return buffer;

  } catch (error) {
    throw error;
  }
};
