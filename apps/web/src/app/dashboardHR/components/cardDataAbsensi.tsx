'use client'

import { dayFormat, hourFormat } from "@/libs/date"
import clsx from "clsx"

enum Status {
    Hadir,
    Terlambat,
    Sakit,
    Cuti,
    Izin,
    Alpha
}

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
            <th className="mx-3 py-1 flex items-center justify-center font-extralight">
                <p className={clsx(`text-center py-2 w-24 text-white rounded-lg px-3`,
                    status == "Hadir" && "bg-green-500/85",
                    status == "Terlambat" && "bg-amber-500/80",
                )}>{status}</p>
            </th>
        </tr>
    )
}

export default CardDataAbsensi