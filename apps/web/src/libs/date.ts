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

export const timeNow = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');

  return `${hours} : ${minute}`;
};

export const dateNow = () => {
  const now = new Date();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  return `${nowDate} ${month[nowMonth]}`;
};

export const dayFormat = (date: string) => {
  if (!date) {
    return ''
  }

  const day = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
  ];

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  const time = new Date(date);
  const tanggal = time.getDate()
  const bulan = time.getMonth();
  const tahun = time.getFullYear();
  const hari = time.getDay()

  return `${day[hari]}, ${tanggal} ${month[bulan]}`
}

export const hourFormat = (date: string) => {
  const time = new Date(date)
  const hours = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minute}`;
}

export const pengajuanFormat = (date: string) => {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  const time = new Date(date);
  const tanggal = time.getDate()
  const bulan = time.getMonth();
  const tahun = time.getFullYear();

  return `${tanggal} ${month[bulan]} ${tahun}`
}

export const piePeriod = () => {
  const today = new Date();
  const pieMonth = today.getMonth();
  const pieYear = today.getFullYear();

  const cutoffDayStart = 21;
  const cutoffDayEnd = 20;

  let cutoffStart: Date;
  let cutoffEnd: Date;

  if (today.getDate() >= cutoffDayStart) {
    cutoffStart = new Date(pieYear, pieMonth, cutoffDayStart);
    cutoffEnd = new Date(pieYear, pieMonth + 1, cutoffDayEnd);
    return `${month[cutoffStart.getMonth()]} ${cutoffStart.getFullYear()} - ${month[cutoffEnd.getMonth()]} ${cutoffEnd.getFullYear()}`
  } else {
    cutoffStart = new Date(pieYear, pieMonth - 1, cutoffDayStart);
    cutoffEnd = new Date(pieYear, pieMonth, cutoffDayEnd);
    return `${month[cutoffStart.getMonth()]} ${cutoffStart.getFullYear()} - ${month[cutoffEnd.getMonth()]} ${cutoffEnd.getFullYear()}`
  }
}