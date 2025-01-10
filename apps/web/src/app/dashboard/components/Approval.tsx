"use client"

import { PengajuanType } from "@/types/pengajuanTypes";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Approval: React.FC<PengajuanType> = ({ startDate, endDate, status, absensi }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLineClammed, setIsLineClammed] = useState(false);

    useEffect(() => {
        if (absensi?.keterangan?.split('').length >= 40) {
            setIsLineClammed(true)
        } else {
            setIsLineClammed(false)
        }
    }, [])

    return (
        <div className="flex flex-col w-fit h-fit border rounded-md border-gray-500 px-5 py-3">
            <div className="flex justify-between">
                <p className="text-lg font-bold text-white pb-3">{absensi?.status}</p>
                <p className="text-sm text-amber-400 font-extralight">{status}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <div>
                        <p className="text-sm text-start font-light text-off-white">{startDate}</p>
                    </div>
                    <FaArrowRightLong size={15} className="fill-amber-400" />
                    <div>
                        <p className="text-sm text-start font-light text-off-white">{endDate}</p>
                        {/* <p className="text-sm text-start font-light text-gray-200/35">Cuti</p> */}
                    </div>
                </div>
            </div>
            <div className="relative pt-3">
                {isLineClammed ? (
                    <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="text-sm text-start line-clamp-1 max-w-80 font-light text-gray-200/35">{absensi?.keterangan}</p>
                ) : (
                    <p className="text-sm text-start line-clamp-1 max-w-80 font-light text-gray-200/35">{absensi?.keterangan}</p>
                )}
                {isHovered && (
                    <div className="absolute text-sm text-start px-3 bg-off-white text-black">
                        {absensi?.keterangan}
                    </div>
                )}
            </div>
            {/* <div className="flex justify-end">
                <button>+</button>
            </div> */}
        </div>
    )
}

export default Approval