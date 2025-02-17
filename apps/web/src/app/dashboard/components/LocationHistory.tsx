'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useGetAllAbsensiByUserId from '@/hooks/absensi/useGetAllAbsensiByUserId';
import { monthFormat } from '@/libs/date';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import LoadingAnimation from '@/components/ui/loadingAnimation';

const LocationHistory = () => {
  const { data, isPending } = useGetAllAbsensiByUserId();
  const [openValue, setOpenValue] = useState("");
  const pathname = usePathname();

  const latestAbsensi = useMemo(() => data?.allAbsensi?.[0], [data?.allAbsensi]);

  useEffect(() => {
    if (latestAbsensi) {
      setOpenValue(latestAbsensi.date);
    }
  }, [latestAbsensi]);

  if (isPending) return (<div className='w-full h-full place-content-center text-center'><LoadingAnimation /></div>);

  if (!data?.allAbsensi.length) return "Belum ada absensi";

  const isHistoryPage = pathname === "/dashboard/clock-in-history";
  const displayedData = isHistoryPage ? data.allAbsensi : data.allAbsensi.slice(0, 10);

  return (
    <div className="w-full">
      <div className="flex items-center px-3 pb-2">
        {isHistoryPage && (
          <Link
            href="/dashboard"
            className='flex items-center gap-2 cursor-pointer'
          >
            <FaArrowLeftLong className='text-neutral-300 hover:text-off-white' />
            <p className='text-neutral-300 hover:text-off-white'>kembali</p>
          </Link>
        )}
        <h1 className={cn(
          "font-bold text-xl text-off-white flex-1",
          isHistoryPage ? "text-center" : "text-start"
        )}>
          Location History
        </h1>
      </div>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-3 h-full"
        value={openValue}
        onValueChange={setOpenValue}
      >
        {displayedData.map((absensi) => (
          <AccordionItem
            key={absensi.id}
            value={absensi.date}
            className='cursor-pointer scrollbar-none group'
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              setOpenValue((prev) => (prev === absensi.date ? "" : absensi.date));
            }}
          >
            <AccordionTrigger>
              <p className='font-base pl-1 text-off-white'>
                {monthFormat(absensi.date)}
              </p>
              <p className={cn(
                `p-1 min-w-[50px] font-light text-center text-black tracking-wide rounded-md`,
                absensi.status === 'Hadir' && 'bg-[#54F1C4]/55 group-hover:bg-[#54F1C4] text-[#54F1C4] group-hover:text-black',
                absensi.status === 'Alpha' && 'bg-[#F4364C]/55 group-hover:bg-[#F4364C] text-[#F4364C] group-hover:text-off-white',
                absensi.status === 'Cuti' && 'bg-[#0437F2]/55 group-hover:bg-[#0437F2] text-[#0437F2] group-hover:text-off-white',
                absensi.status === 'Izin' && 'bg-[#F47FFF]/55 group-hover:bg-[#F47FFF] text-[#F47FFF] group-hover:text-black',
                absensi.status === 'Sakit' && 'bg-[#FCF55F]/55 group-hover:bg-[#FCF55F] text-[#FCF55F] group-hover:text-black'
              )}>
                {absensi.status}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className='px-2 pt-8 space-y-3 text-sm font-extralight'>
                <p className='text-off-white'>
                  {absensi.location ? `${absensi.location}` : "—"}
                </p>
                <p className='text-neutral-500'>
                  {absensi.latitude && absensi.longitude ? `${absensi.latitude}, ${absensi.longitude}` : "—"}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {!isHistoryPage && data.allAbsensi.length > 10 && (
        <div className="flex justify-center pt-2">
          <Link
            href="/dashboard/clock-in-history"
            className="text-sm text-center relative group w-fit inline-block italic"
          >
            show more
            <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-off-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LocationHistory;