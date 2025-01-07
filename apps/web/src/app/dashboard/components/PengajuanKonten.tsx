"use client"
import ButtonSpan from "@/components/buttons/spanButtons"
import Kalender from "./Kalender"
import { useState } from "react"
import CutiLemburModal from "./CutiLemburModal"

const PengajuanKonten = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className="bg-neutral-950 w-2/6 h-[248px] place-content-center rounded-lg">
            <Kalender onClick={() => setIsOpenModal(true)} />
            <ButtonSpan
                type='button'
                onClick={() => setIsOpenModal(true)}
            >
                pengajuan
            </ButtonSpan>
            <CutiLemburModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </div>
    )
}

export default PengajuanKonten