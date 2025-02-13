import { toZonedTime, fromZonedTime } from 'date-fns-tz'

export const convertToUTC = (date: Date): Date => {
    return fromZonedTime(date, 'Asia/Jakarta')
};

export const convertToWIB = (date: Date): Date => {
    return toZonedTime(date, 'Asia/Jakarta')
};

export const getDayRange = () => {
    const now = new Date();
    const nowWIB = convertToWIB(now);

    const startOfDayWIB = new Date(
        nowWIB.getFullYear(),
        nowWIB.getMonth(),
        nowWIB.getDate(),
        0, 0, 0, 0
    );

    const endOfDayWIB = new Date(
        nowWIB.getFullYear(),
        nowWIB.getMonth(),
        nowWIB.getDate(),
        23, 59, 59, 999
    );
    
    return {
        startDayUTC: convertToUTC(startOfDayWIB),
        endDayUTC: convertToUTC(endOfDayWIB),
    };
};

export const getCurrentWIBTime = () => {
    const now = new Date();
    return convertToWIB(now);
};