'use client'

import { dayFormat, hourFormat } from "@/libs/date"
import clsx from "clsx"
import { useEffect, useState } from "react"

interface CardAbsensiProps {
    name: string,
    clockIn: string,
    clockOut: string,
    date: string,
    pengajuan: { startDate: string, endDate: string }[],
    duration: string,
    activeBackground: boolean,
    status: 'Hadir' | 'Terlambat' | 'Sakit' | 'Cuti' | 'Izin' | 'Alpha'
}

const CardDataAbsensi: React.FC<CardAbsensiProps> = ({ name, clockIn, clockOut, status, date, pengajuan, duration, activeBackground }) => {
    const hours = duration?.split(':')[0];
    const minutes = duration?.split(':')[1];

    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();

    useEffect(() => {
        pengajuan.map((item) => {
            setStartDate(item.startDate)
            setEndDate(item.endDate)
        })
    }, [pengajuan])

    return (
        <tr className={clsx("border-b border-black/10", activeBackground && "bg-broken-white/50")}>
            <th className="px-3 py-1 text-start font-extralight">{name}</th>
            <th className="px-3 py-1 text-center font-extralight">{clockIn ? hourFormat(clockIn) : "--/--"}</th>
            <th className="px-3 py-1 text-center font-extralight">{clockOut ? hourFormat(clockOut) : `--/--`}</th>
            <th className="px-3 py-1 text-center font-extralight">{duration ? `${hours}h ${minutes}m` : `--/--`}</th>
            <th className="px-3 py-1 text-center font-extralight">{
                status === 'Cuti' || status === 'Izin' || status === 'Sakit' ? `${dayFormat(startDate!) || ''} - ${dayFormat(endDate!) || ''}` : `${dayFormat(date)}`
            }</th>
            <th className="py-1 flex items-center justify-center font-light">
                <p className={clsx(`text-center py-2  w-full text-black rounded-lg `,
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