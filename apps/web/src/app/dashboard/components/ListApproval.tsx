"use client"

import usePengajuanByUser from "@/hooks/usePengajuanByUser"
import Approval from "./Approval"
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const ListApproval = () => {
    const { data } = usePengajuanByUser({
        take: 10
    });

    return (
        <>
            {data?.length == 0 ? (
                <div className="flex flex-col gap-3 overflow-auto scrollbar-none w-full h-full">
                    <div className="border rounded-md w-full h-fit bg-black border-gray-500 hover:border-off-white px-5 py-3">
                        <div className="flex justify-between">
                            <p className="text-lg font-bold text-white pb-3">Data Kosong</p>
                            <p className="text-sm font-light">Data Kosong</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-8">
                                <div>
                                    <p className="text-sm text-start font-light text-off-white">-- / --</p>
                                </div>
                                <FaArrowRightLong size={15} className="fill-amber-400" />
                                <div>
                                    <p className="text-sm text-start font-light text-off-white">-- / --</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-start line-clamp-1 max-w-80 font-light text-gray-200/45 pt-3">
                            ―
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex gap-3 w-full flex-col overflow-auto scrollbar-none'>
                    {data?.map((item) => {
                        return (
                            <Approval key={item.id} startDate={item.startDate} endDate={item.endDate} status={item.status} absensi={item.absensi} />
                        )
                    })}
                    {data?.length! > 10 && (
                        <Link
                            href="/dashboard/absensi-history"
                            className="text-sm italic"
                        >
                            show more
                        </Link>
                    )}
                </div>
            )}
        </>
    )
}

export default ListApproval