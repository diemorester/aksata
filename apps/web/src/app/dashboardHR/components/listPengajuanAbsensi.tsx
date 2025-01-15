"use client"

import usePengajuanByHR from "@/hooks/usePengajuanByHR"
import CardPengajuanAbsensi from "./cardPengajuanAbsensi";

const ListPengajuanAbsensi = () => {
    const { data, revalidate } = usePengajuanByHR({
        take: 6
    });

    return (
        <div className="flex flex-col">
            <h2 className="text-lg font-medium p-3">Pengajuan Absensi</h2>
            <div className="grid grid-cols-3 gap-5">
                {data?.response.map((item) => {
                    return <CardPengajuanAbsensi key={item.id} id={item.id} absensi={item.absensi} revalidate={revalidate} user={item.user} startDate={item.startDate} endDate={item.endDate} />
                })}
            </div>
        </div>
    )
};

export default ListPengajuanAbsensi;