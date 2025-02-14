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
import { useState } from 'react';
import { LuClock8 } from 'react-icons/lu';
import { LuClipboardList, LuClipboardCopy, LuClipboardPaste } from "react-icons/lu";

interface ListCardDataLemburPerdinProps {
  userId: string;
}

const ListCardDataLemburPerdin: React.FC<ListCardDataLemburPerdinProps> = ({
  userId,
}) => {

  const [filterType, setFilterType] = useState<"Monthly" | "Yearly">("Monthly");
  const { data: pengajuanData, error } = useGetPengajuanLemburPerdinByUserId(userId, filterType);

  if (error) {
    notFound()
  }

  const option = [
    {
      label: 'Bulan',
      value: 'Monthly'
    },
    {
      label: 'Tahun',
      value: 'Yearly'
    }
  ];

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === 'Monthly' || selectedValue === 'Yearly') {
      setFilterType(selectedValue);
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-3 relative">
      <div className='w-full flex flex-col justify-between md:py-5 md:px-6 z-30 bg-off-white sticky top-10 rounded-lg shadow-sm shadow-black/25'>
        <div className='w-full font-semibold flex justify-between'>
          <Link className='flex items-center gap-x-2 hover:text-neutral-500 transition ease-in-out' href="/dashboardHR/data-lembur-perdin">
            <FaArrowLeftLong />
            kembali
          </Link>
          <div className='flex gap-x-2 items-center'>
            <div className='md:w-[122px] text-start'>
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
              classname='px-5 py-3'
            >
              Export
            </ButtonSpan>
          </div>
        </div>
        <div className='flex px-1 py-2 items-center space-x-3'>
          <Avatar image={pengajuanData?.user.avatar!} size='Large' />
          <div className='flex flex-col h-full justify-between p-1 md:px-6'>
            <p className='text-xl font-bold'>{pengajuanData?.user.name}</p>
            <div className='flex flex-col md:flex-row px-1 pt-3 gap-3 justify-start md:gap-x-32'>
              <div className='text-xs md:text-base'>
                <label className='block font-light text-neutral-800'>Phone Number</label>
                <p className='md:px-1'>{pengajuanData?.user.phone == null ? '-' : `+62 ${pengajuanData.user.phone}`}</p>
              </div>
              <div className='text-xs md:text-base'>
                <label className='block font-light text-neutral-800'>Email</label>
                <p className='md:px-1'>{pengajuanData?.user.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 gap-3">
          <div className="flex md:px-5 md:py-4 md:gap-x-5 rounded-xl bg-slate-200">
            <LuClock8 className='rounded-full bg-off-white w-12 h-12 p-2 text-black' width={25} height={25} />
            <div className='space-y-1'>
              <label className='block font-light text-sm text-neutral-700'>Total Hours</label>
              <p className='font-semibold text-lg px-2'>{pengajuanData?.totalHours}</p>
            </div>
          </div>
          <div className="flex md:px-5 md:py-4 md:gap-x-5 rounded-xl bg-slate-200">
            <LuClipboardCopy className='rounded-full bg-off-white w-12 h-12 p-2 text-black' width={25} height={25} />
            <div className='space-y-1'>
              <label className='block font-light text-sm'>Total Lembur</label>
              <p className='font-semibold text-lg px-2'>{pengajuanData?.totalLembur}</p>
            </div>
          </div>
          <div className="flex md:px-5 md:py-4 md:gap-x-5 rounded-xl bg-slate-200">
            <LuClipboardPaste className='rounded-full bg-off-white w-12 h-12 p-2 text-black' width={25} height={25} />
            <div className='space-y-1'>
              <label className='block font-light text-sm'>Total Perjalanan Dinas</label>
              <p className='font-semibold text-lg px-2'>{pengajuanData?.totalPerjalananDinas}</p>
            </div>
          </div>
          <div className="flex md:px-5 md:py-4 md:gap-x-5 rounded-xl bg-slate-200">
            <LuClipboardList className='rounded-full bg-off-white w-12 h-12 p-2 text-black' width={25} height={25} />
            <div className='space-y-1'>
              <label className='block font-light text-sm'>Total Pengajuan</label>
              <p className='font-semibold text-lg px-2'>{pengajuanData?.totalPengajuan}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-2 relative overflow-auto scrollbar-none'>
        <div className='grid md:grid-cols-3 grid-rows-2 gap-3'>
          {pengajuanData?.pengajuanUser.map((pengajuan) => {
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
      </div>
      {pengajuanData?.pengajuanUser.length === 0 && (
        <div>
          <Empty className='py-32' />
        </div>
      )}
    </div>
  );
};

export default ListCardDataLemburPerdin;
