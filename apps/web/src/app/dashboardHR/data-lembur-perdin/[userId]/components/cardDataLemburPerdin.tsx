"use client"

import { pengajuanFormat } from '@/libs/date';
import { cn } from '@/libs/utils';
import { PengajuanLemburPerdinType } from '@/types/pengajuanTypes';
import { FaRegCalendar } from 'react-icons/fa6';

const CardDataLemburPerdin: React.FC<PengajuanLemburPerdinType> = ({
  id,
  date,
  createdAt,
  keterangan,
  nominal,
  durationHours,
  kota,
  statusPengajuan,
  tipePengajuan,
  updatedAt,
  userId,
}) => {
  return (
    <div className='flex flex-col justify-between rounded-lg bg-off-white p-3 h-36'>
      <div className='flex justify-between pb-5'>
        <div className='flex items-center gap-x-2 text-neutral-500'>
          <FaRegCalendar />
          <p>{pengajuanFormat(date)}</p>
        </div>
        <div className='text-sm'>
          <p
            className={cn(`px-3 py-2 rounded-lg`,
              tipePengajuan === 'Lembur' && 'text-black bg-[#37d5fb]/25',
              tipePengajuan === 'PerjalananDinas' && 'text-black bg-[#ff69b4]/25'
            )}
          >
            {tipePengajuan.replace(/([a-z])([A-Z])/g, '$1 $2')}
          </p>
        </div>
      </div>
      <div className='text-sm'>
        {tipePengajuan === 'Lembur' ? (
          <div>
            Durasi Lembur:&nbsp;
            <span className='font-bold'>
              {durationHours}
            </span>
            &nbsp;jam
          </div>
        ) : (
          <div>
            {kota}
          </div>)}
      </div>
      <p className='text-sm font-bold'>{keterangan}</p>
    </div>
  );
};

export default CardDataLemburPerdin;
