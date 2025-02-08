"use client"

import useGetAllPengajuanLemburPerdin from "@/hooks/adminHR/useGetAllPengajuanLemburPerdin"
import { Empty } from "antd";
import CardPengajuanLemburPerdin from "./cardPengajuanLemburPerdin";

const ListPengajuanLemburPerdin = () => {
    const { data, revalidate } = useGetAllPengajuanLemburPerdin();
console.log(data);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
                {data?.response.map((item) => {
                    return <CardPengajuanLemburPerdin key={item.id} id={item.id} revalidate={revalidate} keterangan={item.keterangan} user={item.user!} tipePengajuan={item.tipePengajuan} date={item.date} />
                })}
            </div>
            {data?.response.length === 0 && (
                <div>
                    <Empty />
                </div>
            )}
        </div>
    )
}

export default ListPengajuanLemburPerdin