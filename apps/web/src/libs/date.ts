export const timeNow = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minute}`;
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
