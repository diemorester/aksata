'use client';

import CardDataAbsensi from './cardDataAbsensi';
import { Absensi } from '@/types/absensiTypes';

interface ListCardAbsensiProps {
  attendance: Absensi[];
  isPending: boolean;
}

const ListCardAbsensi: React.FC<ListCardAbsensiProps> = ({
  attendance,
  isPending,
}) => {
  if (attendance?.length === 0) {
    return <p>tidak ada wey</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {attendance.map((absen) => {
        return (
          <CardDataAbsensi
            key={absen.id}
            name={absen.user.name}
            date={absen.date}
            clockIn={absen.clockIn}
            clockOut={absen.clockOut}
            status={absen.status}
          />
        );
      })}
    </>
  );
};

export default ListCardAbsensi;
