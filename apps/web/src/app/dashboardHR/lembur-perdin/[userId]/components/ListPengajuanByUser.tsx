'use client';

import useGetPengajuanByUserId from '@/hooks/adminHR/useGetPengajuanByUserId';
import CardPengajuanByUser from './CardPengajuanByUser';

interface ListPengajuanByUserProps {
  userId: string;
}

const ListPengajuanByUser: React.FC<ListPengajuanByUserProps> = ({
  userId,
}) => {
  const { data: pengajuanData } = useGetPengajuanByUserId(userId);

  if (pengajuanData?.response.length === 0) {
    return 'Tidak ada data banggg';
  }

  return (
    <div className="flex gap-10 flex-wrap">
      {pengajuanData?.response.map((pengajuan) => {
        return (
          <CardPengajuanByUser
            key={pengajuan.id}
            createdAt={pengajuan.createdAt}
            date={pengajuan.date}
            id={pengajuan.date}
            keterangan={pengajuan.keterangan}
            nominal={pengajuan.nominal}
            statusPengajuan={pengajuan.statusPengajuan}
            tipePengajuan={pengajuan.tipePengajuan}
            updatedAt={pengajuan.updatedAt}
            userId={pengajuan.userId}
          />
        );
      })}
    </div>
  );
};

export default ListPengajuanByUser;
