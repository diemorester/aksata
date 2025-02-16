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
        Sakit: Object.keys(variableFormatData).filter((date) => variableFormatData[date] == 'Sakit').map((date) => new Date(date)),
        weekEnd: (day) => day.getDay() == 0 || day.getDay() == 6
      }}
      modifiersClassNames={{
        Hadir: 'bg-[#54F1C4]/55 text-[#54F1C4] hover:bg-[#54F1C4] hover:text-black cursor-pointer active:scale-95',
        Alpha: 'bg-[#F4364C]/55 text-[#F4364C] hover:bg-[#F4364C] hover:text-off-white cursor-pointer active:scale-95',
        Cuti: 'bg-[#0437F2]/55 text-[#0437F2] hover:bg-[#0437F2] hover:text-off-white cursor-pointer active:scale-95',
        Izin: 'bg-[#F47FFF]/55 text-[#F47FFF] hover:bg-[#F47FFF] hover:text-black cursor-pointer active:scale-95',
        Sakit: 'bg-[#FCF55F]/55 text-[#FCF55F] hover:bg-[#FCF55F] hover:text-black cursor-pointer active:scale-95',
        weekEnd: 'text-red-500'
      }}
    />
  );
};

export default AbsensiHistory;
