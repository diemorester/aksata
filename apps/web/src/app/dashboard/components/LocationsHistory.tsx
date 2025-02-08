'use client';

import useGetAllAbsensiByUserId from '@/hooks/absensi/useGetAllAbsensiByUserId';

const LocationsHistory = () => {
  const { data, isPending } = useGetAllAbsensiByUserId();

  if (isPending) {
    return 'Loading...';
  }

  if (data?.allAbsensi.length === 0) {
    return 'Belum ada absensi';
  }

  return (
    <div className="w-full">
      <h1 className="font-semibold">History Clock-In</h1>
      <div className="scrollbar-none flex flex-col gap-3 max-h-[230px] overflow-y-auto">
        {data?.allAbsensi.map((absensi) => {
          return (
            <div key={absensi.id} className="border p-1 px-4 rounded-lg">
              <p>{absensi.status}</p>
              <p>{absensi.date}</p>
              <p>
                {absensi.latitude && absensi.longitude
                  ? `${absensi.latitude}, ${absensi.longitude}`
                  : '-'}
              </p>
              <p>{absensi.location ? `${absensi.location}` : '-'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationsHistory;
