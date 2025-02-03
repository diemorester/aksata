"use client"

import Modal from "@/components/Modal"

interface ModalPengajuanProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPengajuan: React.FC<ModalPengajuanProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            ristoan
            backgroundClose
        >
            <div className="flex flex-col">
                <div className="border-b-[1px] border-neutral-500">
                    <p className="font-semibold text-off-white pb-3">Buat Pengajuan</p>
                </div>
                <div className="flex flex-col"></div>
            </div>
        </Modal>
    )
}

export default ModalPengajuan