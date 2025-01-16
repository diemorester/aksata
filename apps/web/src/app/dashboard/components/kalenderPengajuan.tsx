'use client';
import { DummyCalendar } from '@/components/DummyCalendar';
import { Calendar } from '@/components/ui/calendar';
import { pengajuanFormat } from '@/libs/date';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { LuCalendar } from 'react-icons/lu';

interface KalenderPengajuanProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const KalenderPengajuan: React.FC<KalenderPengajuanProps> = ({
  date,
  setDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (selected: DateRange | undefined) => {
    if (selected?.from && !selected.to) {
      setDate({ from: selected?.from, to: selected?.from });
    } else {
      setDate(selected);
    }
  };

  return (
    <div className="relative " ref={modalRef}>
      <button
        className="flex py-[13px] px-5 items-center text-off-white w-full border-2 rounded-md justify-between border-off-white"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {date?.from ? (
          <>
            {pengajuanFormat(date.from.toISOString())}
            {date.to &&
              date.from !== date.to &&
              ` - ${pengajuanFormat(date.to.toISOString())}`}
          </>
        ) : (
          <p className="text-sm text-neutral-500/65">― pilih tanggal ―</p>
        )}
        <LuCalendar size={30} />
      </button>
      {isOpen && (
        <div className="absolute rounded-lg z-30">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
          />
        </div>
      )}
    </div>
  );
};

export default KalenderPengajuan;
