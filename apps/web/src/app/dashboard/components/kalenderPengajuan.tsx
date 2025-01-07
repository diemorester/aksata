"use client"

import Calendar from "@/components/Calendar";
import { pengajuanFormat } from "@/libs/date";
import { useEffect, useRef, useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { LuCalendar } from "react-icons/lu";

interface KalenderPengajuanProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

const KalenderPengajuan: React.FC<KalenderPengajuanProps> = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOnSide = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      } 
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOnSide)
    }
    return () => {
      document.addEventListener('click', handleClickOnSide)
    }
  }, [isOpen])

  const handleSelect = (selected: DateRange | undefined) => {
    setDate(selected)
  }

  return (
    <div className="relative" ref={modalRef}>
      <button className="flex py-2 px-3 items-center text-off-white w-full border-2 rounded-md justify-between border-off-white" type="button" onClick={() => setIsOpen(!isOpen)}>
        {date?.from ? (date.to ?
          <>
            {pengajuanFormat(date.from.toISOString())} - {pengajuanFormat(date.to.toISOString())}
          </>
          :
          <>
            {pengajuanFormat(date.from.toISOString())}
          </>
        ) : <p>{pengajuanFormat(new Date().toISOString())}</p>}
        <LuCalendar size={30} />
      </button>
      {isOpen && (
        <div className="absolute bg-neutral-800 p-5 rounded-xl z-30" >
          <Calendar date={date} onSelect={handleSelect} numberOfMonth={1} />
        </div>
      )}
    </div>
  )
}

export default KalenderPengajuan