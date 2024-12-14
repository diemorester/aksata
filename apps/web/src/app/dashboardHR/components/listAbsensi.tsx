'use client'

import ButtonSpan from "@/components/buttons/spanButtons"
import SearchBar from "./searchBarHR"

const ListAbsensi = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full min-h-screen mx-auto">
                <div className="flex w-full justify-between items-center px-2 pt-5">
                    <SearchBar />
                    <h1 className="text-[24px] font-semibold text-end text-black pb-1 px-6">DASHBOARD</h1>
                </div>
                <div className="flex flex-col justify-between rounded-md mx-5 px-3 bg-slate-100 md:h-[550px]">
                    <table className="mt-2 md:w-full">
                        <thead className="pb-5 text-black">
                            <tr className="border-b-[2px] text-start border-black">
                                <th className="p-3 text-start font-semibold">Nama</th>
                                <th className="hidden p-3 text-start md:table-cell font-semibold">Waktu Check-In</th>
                                <th className="hidden p-3 text-start md:table-cell font-semibold">Waktu Check-Out</th>
                                <th className="hidden p-3 text-start md:table-cell font-semibold">Status</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="flex justify-end items-center px-3 pb-6">
                            <ButtonSpan
                                type="submit"
                                fill="bg-green-500"
                            >
                                PRINT
                            </ButtonSpan>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListAbsensi