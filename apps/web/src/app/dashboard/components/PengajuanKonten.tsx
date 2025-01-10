"use client"
import ButtonSpan from "@/components/buttons/spanButtons"
import Kalender from "./Kalender"
import { useState } from "react"
import CutiLemburModal from "./CutiLemburModal"

const PengajuanKonten = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <div className="relative">
                <Kalender onClick={() => setIsOpenModal(true)} />
            </div>
            <div>
                <ButtonSpan
                    type='button'
                    onClick={() => setIsOpenModal(true)}
                >
                    pengajuan
                </ButtonSpan>
            </div>
            <CutiLemburModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </div>
    )
}

export default PengajuanKonten