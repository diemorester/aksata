'use client'

import { dayFormat, hourFormat } from "@/libs/date"
import clsx from "clsx"

interface CardAbsensiProps {
    name: string,
    clockIn: string,
    clockOut: string,
    date: string,
    status: 'Hadir' | 'Terlambat' | 'Sakit' | 'Cuti' | 'Izin' | 'Alpha'
}

const CardDataAbsensi: React.FC<CardAbsensiProps>  = ({ name, clockIn, clockOut, status, date }) => {
    
    return (
        <tr className="border-b border-black/10">
            <th className="px-3 py-1 text-start font-extralight">{name}</th>
            <th className="px-3 py-1 text-center font-extralight">{clockIn ? hourFormat(clockIn) : "--/--"}</th>
            <th className="px-3 py-1 text-center font-extralight">{clockOut ? hourFormat(clockOut) : `--/--`}</th>
            <th className="px-3 py-1 text-center font-extralight">{dayFormat(date)}</th>
            <th className="mx-3 py-1 flex items-center justify-center font-light">
                <p className={clsx(`text-center py-2 w-24 text-black rounded-lg px-3`,
                    status == "Hadir" && "bg-green-500/85",
                    status == "Terlambat" && "bg-amber-500/85",
                    status == "Sakit" && "bg-[#FFFF33]",
                    status == "Cuti" && "bg-[#87CEFA]",
                    status == "Izin" && "bg-violet-400",
                    status == "Alpha" && "bg-[#FF4500]"
                )}>{status}</p>
            </th>
        </tr>
    )
}

export default CardDataAbsensi