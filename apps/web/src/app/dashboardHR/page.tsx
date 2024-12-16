'use client';
import useAbsensi from '@/hooks/useAbsensi';
import { useState } from 'react';

export default function DashboardHR() {
  const [page, setPage] = useState(1);

  const absensi = useAbsensi({ page, take: 10 });

  return (
    <div>
      {absensi.data?.attendance?.map((absen) => {
        return <div>{absen.user.name}</div>;
      })}
    </div>
  );
}
