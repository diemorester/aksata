export const timeNow = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');

  return `${hours} : ${minute}`;
};

export const dateNow = () => {
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

  const now = new Date();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  return `${nowDate} ${month[nowMonth]}`;
};

export const dayFormat = (date: string) => {
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