'use client';

import useGetPengajuanByUserId from '@/hooks/adminHR/useGetPengajuanByUserId';
import CardDataLemburPerdin from './cardDataLemburPerdin';
import { Empty } from 'antd';
import Link from 'next/link';

interface ListCardDataLemburPerdinProps {
  userId: string;
}

const ListCardDataLemburPerdin: React.FC<ListCardDataLemburPerdinProps> = ({
  userId,
}) => {
  const { data: pengajuanData } = useGetPengajuanByUserId(userId);

  return (
    <div className="w-full">
      <Link href="/dashboardHR/data-lembur-perdin">kembali</Link>
      <div className='flex gap-10 flex-wrap bg-red-500'>
        {pengajuanData?.response.map((pengajuan) => {
          return (
            <CardDataLemburPerdin
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
      {pengajuanData?.response.length === 0 && (
        <div>
          <Empty className='py-32' />
        </div>
      )}
    </div>
  );
};

export default ListCardDataLemburPerdin;
