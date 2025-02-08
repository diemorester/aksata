"use client"
import Kalender from "./Kalender"
import { useState } from "react"
import CutiLemburModal from "./CutiLemburModal"

const PengajuanKonten = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className="flex flex-row md:flex-col justify-center items-center gap-6 pt-2 w-full h-full">
            <div className="relative">
                <Kalender onClick={() => setIsOpenModal(true)} />
            </div>
            <div>
                <button
                    onClick={() => setIsOpenModal(true)}
                    className="font-light px-3 py-1 active:scale-95 text-gray-500 hover:text-off-white border rounded-md border-gray-500 hover:border-off-white"
                >
                    buat pengajuan
                </button>
            </div>
            <CutiLemburModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </div>
    )
}

export default PengajuanKonten