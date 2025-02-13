import { convertToUTC, convertToWIB } from "./timezoneConverter";

export const getDateRange = (
    type: 'Monthly' | 'Yearly',
    referenceDate: Date = new Date()
) => {
    const referenceWIB = convertToWIB(referenceDate);

    let startWIB: Date;
    let endWIB: Date;

    switch (type) {
        case 'Monthly':
            const currentDay = referenceWIB.getDate();
            const currentMonth = referenceWIB.getMonth();
            const currentYear = referenceWIB.getFullYear();

            if (currentDay < 21) {
                startWIB = new Date(currentYear, currentMonth - 1, 21, 0, 0, 0, 0);
                endWIB = new Date(currentYear, currentMonth, 20, 23, 59, 59, 999);
            } else {
                startWIB = new Date(currentYear, currentMonth, 21, 0, 0, 0, 0);
                endWIB = new Date(currentYear, currentMonth + 1, 20, 23, 59, 59, 999);
            }
            break;

        case 'Yearly':
            const currentYearForYearly = referenceWIB.getFullYear();
            startWIB = new Date(currentYearForYearly, 0, 21, 0, 0, 0, 0);
            endWIB = new Date(currentYearForYearly + 1, 0, 21, 23, 59, 59, 999);
            break;

        default:
            throw new Error("Tipe salah. Mohon hanya gunakan tipe 'Monthly' atau 'Yearly'");
    }

    return {
        startUTC: convertToUTC(startWIB),
        endUTC: convertToUTC(endWIB)
    }
}