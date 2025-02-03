// Kamis, 12 November 2024
export const convertDate = (date: Date | null) => {
  if (date == null) {
    return '-';
  }

  const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const time = new Date(date);
  const tanggal = time.getDate();
  const bulan = time.getMonth();
  const tahun = time.getFullYear();
  const hari = time.getDay();

  return `${day[hari]}, ${tanggal} ${month[bulan]} ${tahun}`;
};

// 08.00
export const hourFormat = (date: Date | null) => {
  if (date == null) {
    return '-';
  }

  const time = new Date(date)
  const hours = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minute}`;
}

export const excelDateFormat = (date: string) => {
  const time = new Date(date);
  const tanggal = time.getDate();
  const bulan = time.getMonth() + 1;
  const tahun = time.getFullYear();

  return `${tanggal}/${bulan}/${tahun}`
}