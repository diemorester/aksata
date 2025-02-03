// Konversi waktu lokal WIB ke UTC
const getWIBToUTC = (date: Date): Date => {
  // Dapatkan offset WIB dalam menit (WIB = UTC+7)
  const offset = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
  return new Date(date.getTime() + offset);
};

// Konversi UTC ke waktu lokal WIB
const getUTCToWIB = (date: Date): Date => {
  const offset = 7 * 60 * 60 * 1000;
  return new Date(date.getTime() + offset);
};

// Hitung rentang hari di WIB (00:00:00 - 23:59:59 WIB) dalam UTC
export const getDayRange = () => {
  const now = new Date();
  const nowWIB = getUTCToWIB(now); // Konversi server time ke WIB

  // Awal hari di WIB (00:00:00 WIB)
  const startOfDayWIB = new Date(
    nowWIB.getFullYear(),
    nowWIB.getMonth(),
    nowWIB.getDate()
  );
  const startDayUTC = getWIBToUTC(startOfDayWIB); // Konversi ke UTC

  // Akhir hari di WIB (23:59:59 WIB)
  const endOfDayWIB = new Date(startOfDayWIB);
  endOfDayWIB.setDate(endOfDayWIB.getDate() + 1);
  endOfDayWIB.setMilliseconds(-1);
  const endDayUTC = getWIBToUTC(endOfDayWIB); // Konversi ke UTC

  return { startDayUTC, endDayUTC };
};

// Dapatkan waktu sekarang di WIB (dalam UTC)
export const getCurrentWIBTime = () => {
  const now = new Date();
  return getWIBToUTC(now);
};