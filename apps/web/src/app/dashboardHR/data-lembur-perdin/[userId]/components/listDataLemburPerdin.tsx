'use client';

import useGetPengajuanLemburPerdinByUserId from '@/hooks/adminHR/useGetPengajuanLemburByUserId';
import CardDataLemburPerdin from './cardDataLemburPerdin';
import { Empty } from 'antd';
import Link from 'next/link';
import { FaArrowLeftLong } from "react-icons/fa6";
import ButtonSpan from '@/components/buttons/spanButtons';
import DropDown from '@/components/dropdowns/dropDown';
import Avatar from '@/components/Avatar';
import { notFound } from 'next/navigation';

interface ListCardDataLemburPerdinProps {
  userId: string;
}

const ListCardDataLemburPerdin: React.FC<ListCardDataLemburPerdinProps> = ({
  userId,
}) => {
  const { data: pengajuanData, error } = useGetPengajuanLemburPerdinByUserId(userId);
  if (error) {
    notFound()
  }

  const option = [
    {
      label: 'Bulanan',
      value: 'monthly'
    },
    {
      label: 'Tahunan',
      value: 'yearly'
    }
  ];

  const handleSelect = () => { }

  return (
    <div className="w-full flex flex-col">
      <div className='w-full flex flex-col justify-between py-3 px-5 h-1/2 bg-off-white rounded-lg shadow-sm shadow-black/25'>
        <div className='w-full font-semibold flex justify-between'>
          <Link className='flex items-center gap-x-2 hover:text-neutral-500 transition ease-in-out' href="/dashboardHR/data-lembur-perdin">
            <FaArrowLeftLong />
            kembali
          </Link>
          <div className='flex items-center'>
            <div className='min-w-[168px]'>
              <DropDown
                pengajuanHR
                options={option}
                onSelect={handleSelect}
              />
            </div>
            <ButtonSpan
              aksata
              type='submit'
              fill='bg-black'
            >
              Export
            </ButtonSpan>
          </div>
        </div>
        <div className='flex py-2 items-center'>
          <Avatar image={pengajuanData?.user.avatar!} size='Large' />
          <div className='flex flex-col h-full justify-between p-1 md:px-6 bg-red-500'>
            <p className='text-2xl font-bold'>Namaasdsadsadsadsadsad</p>
            <div className='flex justify-start gap-x-20'>
              <p>Apa 1</p>
              <p>Apa 2</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-1 gap-3">
          <div >1</div>
          <div >2</div>
          <div >3</div>
          <div >4</div>
        </div>
      </div>
      <div className='flex gap-10 flex-wrap'>
        {pengajuanData?.response.map((pengajuan) => {
          return (
            <CardDataLemburPerdin
              key={pengajuan.id}
              createdAt={pengajuan.createdAt}
              date={pengajuan.date}
              id={pengajuan.date}
              keterangan={pengajuan.keterangan}
              nominal={pengajuan.nominal}
              durationHours={pengajuan.durationHours}
              kota={pengajuan.kota}
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
