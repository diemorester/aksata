import { durationCounter } from "@/helpers/durationCounter";
import { convertToWIB, getDayRange } from "@/helpers/timezoneConverter";
import prisma from "@/prisma";
import { isWeekend } from "date-fns";
import Holidays from "date-holidays";

export const autoAlphaAttendance = async () => {
    const { startDayUTC, endDayUTC } = getDayRange();
    const todayLocal = new Date();
    const todayUTC = convertToWIB(todayLocal);

    if (isWeekend(todayUTC)) {
        return;
    }
    
    const localHoliday = new Holidays('ID');
    if (localHoliday.isHoliday(todayLocal)) {
        return;
    }

    try {
        const users = await prisma.user.findMany();

        for (const user of users) {
            const existingAttendace = await prisma.absensi.findFirst({
                where: {
                    userId: user.id,
                    date: {
                        gte: startDayUTC,
                        lte: endDayUTC,
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
    const { startDayUTC, endDayUTC } = getDayRange();

    try {
        const attendance = await prisma.absensi.findMany({
            where: {
                user: {
                    role: 'User'
                },
                status: 'Hadir',
                clockIn: {
                    not: null
                },
                clockOut: {
                    equals: null
                },
                date: {
                    gte: startDayUTC,
                    lte: endDayUTC
                }
            }
        });

        for (const attend of attendance) {
            const updateClockOut = await prisma.absensi.update({
                where: {
                    id: attend.id,
                },
                data: {
                    clockOut: new Date(),
                    isActive: false
                },
            });

            const duration = durationCounter(
                updateClockOut.clockIn,
                updateClockOut.clockOut,
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

export const autoIsActiveRemoval = async () => {
    const { startDayUTC, endDayUTC } = getDayRange();
    try {
        const attendance = await prisma.absensi.findMany({
            where: {
                user: {
                    role: 'User'
                },
                status: 'Hadir',
                clockIn: {
                    not: null
                },
                date: {
                    gte: startDayUTC,
                    lte: endDayUTC
                }
            }
        });

        for (const attend of attendance) {

            await prisma.absensi.update({
                where: {
                    id: attend.id,
                },
                data: {
                    isActive: false
                },
            });
        }
    } catch (error) {
        throw error;
    }
};

export const autoPostPengajuanService = async () => {
    const { startDayUTC, endDayUTC } = getDayRange();
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        const pengajuanToday = await prisma.pengajuanAbsensi.findMany({
            where: {
                status: 'Approved',
                startDate: {
                    lte: today
                },
                endDate: {
                    gte: today
                }
            },
            include: {
                absensi: {
                    select: {
                        id: true,
                        status: true,
                        keterangan: true
                    }
                }
            }
        })

        for (const pengajuan of pengajuanToday) {
            const existingAbsensi = await prisma.absensi.findFirst({
                where: {
                    userId: pengajuan.userId,
                    date: {
                        gte: startDayUTC,
                        lte: endDayUTC,
                    }
                }
            })

            if (!existingAbsensi) {
                await prisma.absensi.create({
                    data: {
                        userId: pengajuan.userId,
                        status: pengajuan.absensi.status,
                        keterangan: pengajuan.absensi.keterangan
                    }
                })
            }
        }

    } catch (error) {
        throw error;
    }
};