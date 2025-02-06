"use client"

import usePengajuanByHR from "@/hooks/usePengajuanByHR"
import CardPengajuanAbsensi from "./cardPengajuanAbsensi";
import { Empty } from "antd";

const ListPengajuanAbsensi = () => {
    const { data, revalidate } = usePengajuanByHR({
        take: 6
    });

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-5">
                {data?.response.map((item) => {
                    return <CardPengajuanAbsensi key={item.id} id={item.id} absensi={item.absensi} revalidate={revalidate} user={item.user} startDate={item.startDate} endDate={item.endDate} />
                })}
            </div>
            {data?.response.length! < 1 && (
                <div className="py-32">
                    <Empty />
                </div>
            )}
        </div>
    )
};

export default ListPengajuanAbsensi;