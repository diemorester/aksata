"use client"

import usePengajuanByUser from "@/hooks/usePengajuanByUser"
import Approval from "./Approval"

const ListApproval = () => {
    const { data } = usePengajuanByUser();

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
                </div>
            )}
        </>
    )
}

export default ListApproval