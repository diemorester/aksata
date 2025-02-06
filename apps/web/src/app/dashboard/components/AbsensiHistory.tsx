'use client'

import { Calendar } from "@/components/ui/calendar";
import useGetAllAbsensiByUserId from "@/hooks/absensi/useGetAllAbsensiByUserId";

enum Status {
  Hadir = 'Hadir',
  Sakit = 'Sakit',
  Cuti = 'Cuti',
  Izin = 'Izin',
  Alpha = 'Alpha'
}

const AbsensiHistory = () => {
  const { data } = useGetAllAbsensiByUserId();
  const variableFormatData = data?.allAbsensi.reduce((acc, absensi) => {
    const dataAbsensi = new Date(absensi.date).toISOString().split('T')[0]
    acc[dataAbsensi] = absensi.status
    return acc
  }, {} as Record<string, Status>) || {}

  // const styleModifier = {
  //   Hadir: {}
  // }

  console.log(variableFormatData, 'pakai tanda donk');
  
  return (
    <Calendar
      numberOfMonths={1}
      className="p-1"
      classNames={{
        day: 'h-8 w-8 text-xs rounded-full flex items-center justify-center',
        caption_label: 'hidden',
        caption: 'hidden',
        month: 'p-0',
        nav: 'hidden',
        head_cell: 'pb-4 pt-1 text-off-white w-full font-semibold text-center',
      }}
      modifiers={{
        Hadir: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Hadir').map((date) => new Date(date)),
        Alpha: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Alpha').map((date) => new Date(date)),
        Cuti: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Cuti').map((date) => new Date(date)),
        Izin: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Izin').map((date) => new Date(date)),
        Sakit: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Sakit').map((date) => new Date(date))
        
      }}
      modifiersClassNames={{
        Hadir: 'bg-[#50C878] text-black',
        Alpha: 'bg-[#E34234] text-black',
        Cuti: 'bg-[#4169E1] text-black',
        Izin: 'bg-[#DA70D6] text-black',
        Sakit: 'bg-[#FCF55F] text-black'
      }}
    />
  );
};

export default AbsensiHistory;
