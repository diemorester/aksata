"use client"

import ButtonSpan from "@/components/buttons/spanButtons";
import ModalApproval from "@/components/modalApproval";
import ModalRefusal from "@/components/modalRefusal";
import { pengajuanFormat } from "@/libs/date";
import { approvePengajuanLemburPerdinFetch, declinePengajuanLemburPerdinFetch } from "@/libs/fetch/pengajuan";
import { AxiosError } from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCalendar } from "react-icons/fa";

interface RevalidateType extends PengajuanLemburPerdinType {
    revalidate: () => void;
}

interface PengajuanLemburPerdinType {
    id: string;
    tipePengajuan: 'Lembur' | 'PerjalananDinas';
    date: string;
    keterangan: string;
    durationHours?: number
    kota?: string
    user: {
        name: string;
        avatar: string | null
    }
}

const CardPengajuanLemburPerdin: React.FC<RevalidateType> = ({ user, id, tipePengajuan, revalidate, date, keterangan, durationHours, kota }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenApproval, setIsOpenApproval] = useState(false);
    const [isOpenRefusal, setIsOpenRefusal] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            await approvePengajuanLemburPerdinFetch(id);
            toast.success('Pengajuan telah diterima!');
            revalidate();
            setIsOpenApproval(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDecline = async () => {
        setIsLoading(true);
        try {
            await declinePengajuanLemburPerdinFetch(id);
            toast.success('Pengajuan telah ditolak!');
            revalidate();
            setIsOpenApproval(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-full border px-3 pt-2 pb-3 bg-off-white rounded-lg shadow-sm shadow-black/35">
            <div className="flex items-center justify-between pb-2">
                <div className="flex pt-4 px-2 space-x-2">
                    <Image
                        width={168}
                        height={168}
                        alt="avatar"
                        src={user?.avatar || '/profileplaceholder.png'}
                        className="rounded-full object-cover w-8 h-8"
                    />
                    <h1 className="text-lg p-1 font-bold">{user?.name}</h1>
                </div>
                <div className="pt-1 pb-5">
                    <h2 className={clsx(`px-3 py-1 cursor-pointer text-sm rounded-lg`,
                        tipePengajuan === 'Lembur' && 'bg-[#DBC6EB]',
                        tipePengajuan === 'PerjalananDinas' && 'bg-[#EFEE9D]'
                    )}>
                        {tipePengajuan}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col min-h-40 justify-between px-3 pt-5">
                <div className="w-full overflow-hidden">
                    <p className="text-start line-clamp-3">
                        {keterangan}
                    </p>
                </div>
                <div>
                    <div className="flex space-x-1 pt-6 text-sm items-center pb-2">
                        <FaRegCalendar className="flex fill-neutral-500" />
                        <p className="text-neutral-500">{pengajuanFormat(date)}</p>
                    </div>
                    <div className="font-semibold text-sm">
                        {tipePengajuan === 'Lembur' ? `${durationHours} jam` : kota}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="space-x-5">
                    <ButtonSpan
                        type="button"
                        disabled={isLoading}
                        onClick={() => setIsOpenRefusal(true)}
                        aksata
                    >
                        decline
                    </ButtonSpan>
                    <ButtonSpan
                        type="button"
                        onClick={() => setIsOpenApproval(true)}
                        fill="bg-black"
                        aksata
                    >
                        Approve
                    </ButtonSpan>
                </div>
            </div>
            <ModalApproval isOpen={isOpenApproval} onClose={() => setIsOpenApproval(false)} isLoading={isLoading} onApprove={handleApprove} />
            <ModalRefusal isOpen={isOpenRefusal} onClose={() => setIsOpenRefusal(false)} isLoading={isLoading} onDecline={handleDecline} />
        </div>
    )
}

export default CardPengajuanLemburPerdin