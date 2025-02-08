const getWIBToUTC = (date: Date): Date => {
    const offset = 7 * 60 * 60 * 1000;
    return new Date(date.getTime() - offset);
};

const getUTCToWIB = (date: Date): Date => {
    const offset = 7 * 60 * 60 * 1000;
    return new Date(date.getTime() + offset);
};

export const getDayRange = () => {
    const now = new Date();
    const nowWIB = getUTCToWIB(now);

    const startOfDayWIB = new Date(
        nowWIB.getFullYear(),
        nowWIB.getMonth(),
        nowWIB.getDate()
    );
    const startDayUTC = getWIBToUTC(startOfDayWIB);

    const endOfDayWIB = new Date(startOfDayWIB);
    endOfDayWIB.setHours(23, 59, 59, 999);
    const endDayUTC = getWIBToUTC(endOfDayWIB);

    return { startDayUTC, endDayUTC };
};

export const getCurrentWIBTime = () => {
    const now = new Date();
    return getUTCToWIB(now);
};