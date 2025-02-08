"use client"

import ButtonSpan from "@/components/buttons/spanButtons"
import { approvePengajuanAbsensiFetch, declinePengajuanAbsensiFetch, } from "@/libs/fetch/pengajuan";
import { PengajuanType } from "@/types/pengajuanTypes";
import { AxiosError } from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { FaRegCalendar } from "react-icons/fa6";
import ModalApproval from "../../../components/modalApproval";
import ModalRefusal from "../../../components/modalRefusal";
import { pengajuanFormat } from "@/libs/date";
import clsx from "clsx";
import Image from "next/image";

interface RevalidateType extends PengajuanType {
    revalidate: () => void;
}

const CardPengajuanAbsensi: React.FC<RevalidateType> = ({ user, absensi, startDate, endDate, id, revalidate, createdAt }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenApproval, setIsOpenApproval] = useState(false);
    const [isOpenRefusal, setIsOpenRefusal] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            await approvePengajuanAbsensiFetch(id!);
            toast.success('Pengajuan telah diterima');
            revalidate();
            setIsOpenApproval(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleDecline = async () => {
        setIsLoading(true);
        try {
            await declinePengajuanAbsensiFetch(id!);
            toast.success('Pengajuan telah ditolak');
            revalidate();
            setIsOpenRefusal(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false);
        }
    }

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
                    <h1 className="text-md pt-1 font-bold">{user?.name}</h1>
                </div>
                <div className="pt-1 pb-5">
                    <h2 className={clsx(`px-3 py-1 cursor-pointer text-sm rounded-lg`,
                        absensi.status === 'Cuti' && "bg-purple-300/30",
                        absensi.status === 'Sakit' && "bg-yellow-200/60",
                        absensi.status === 'Izin' && "bg-blue-500/60"
                    )}>{absensi.status}</h2>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-3 px-3">
                <div className="w-full h-16 my-auto overflow-hidden">
                    <p className="text-sm text-start line-clamp-3">
                        {absensi.keterangan}
                    </p>
                </div>
                <div className="flex space-x-1">
                    <FaRegCalendar className="flex fill-neutral-500" />
                    <p className="text-xs text-neutral-500 pt-[1px]">{pengajuanFormat(startDate)} - {pengajuanFormat(endDate)}</p>
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

export default CardPengajuanAbsensi