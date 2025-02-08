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
    tipePengajuan: 'LemburSatu' | 'LemburDua' | 'LemburTiga' | 'PerjalananDinas';
    date: string;
    keterangan: string;
    user: {
        name: string;
        avatar: string | null
    }
}

const CardPengajuanLemburPerdin: React.FC<RevalidateType> = ({ user, id, tipePengajuan, revalidate, date, keterangan }) => {
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
        <div className="flex flex-col border gap-8 px-3 pt-2 pb-3 bg-off-white rounded-lg shadow-sm shadow-black/35">
            <div className="flex items-center justify-between">
                <div className="flex pt-4 px-2 space-x-2">
                    <Image
                        width={168}
                        height={168}
                        alt="avatar"
                        src={user?.avatar || '/profileplaceholder.png'}
                        className="rounded-full object-cover w-8 h-8"
                    />
                    <h1 className="text-md p-1 font-bold">{user?.name}</h1>
                </div>
                <div className="pt-1 pb-5">
                    <h2 className={clsx(`px-3 py-1 cursor-pointer text-sm rounded-lg`,
                        tipePengajuan === 'LemburSatu' && 'bg-[#ABC2E8]',
                        tipePengajuan === 'LemburDua' && 'bg-[#DBC6EB]',
                        tipePengajuan === 'LemburTiga' && 'bg-[#D1EAA3]',
                        tipePengajuan === 'PerjalananDinas' && 'bg-[#EFEE9D]'
                    )}>
                        {tipePengajuan.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-3 px-3">
                <div className="w-full h-16 my-auto overflow-hidden">
                    <p className="text-sm text-start line-clamp-3">
                        {keterangan}
                    </p>
                </div>
                <div className="flex space-x-1">
                    <FaRegCalendar className="flex fill-neutral-500" />
                    <p className="text-xs text-neutral-500 pt-[1px]">{pengajuanFormat(date)}</p>
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