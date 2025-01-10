"use client"

import usePengajuanByUser from "@/hooks/usePengajuanByUser"
import Approval from "./Approval"
import Link from "next/link";

const ListApproval = () => {
    const { data } = usePengajuanByUser({
        take: 4
    });

    return (
        <>
            {data?.length == 0 ? (
                <div>data tydack ada</div>
            ) : (
                <div className='flex gap-3 flex-col overflow-auto scrollbar-none'>
                    {data?.map((item) => {
                        return (
                            <Approval key={item.id} startDate={item.startDate} endDate={item.endDate} status={item.status} absensi={item.absensi} />
                        )
                    })}
                    {data?.length! > 3 && (
                        <Link
                            href="/dashboard/pengajuan/history"
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