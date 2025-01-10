'use client'
import ButtonSpan from "@/components/buttons/spanButtons";
import DropDown from "@/components/dropdowns/dropDown";
import Modal from "@/components/Modal";
import { pengajuanAbsensiFetch } from "@/libs/fetch/pengajuan";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import KalenderPengajuan from "./kalenderPengajuan";

interface CutiLemburModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CutiLemburModal: React.FC<CutiLemburModalProps> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState<DateRange | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [pengajuan, setPengajuan] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const options = [
        {
            label: "Sakit",
            value: "Sakit"
        },
        {
            label: "Cuti",
            value: "Cuti"
        },
        {
            label: "Izin",
            value: "Izin"
        },
    ];

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const payload = { 
                status: pengajuan,
                startDatePengajuan: date?.from?.toISOString(),
                endDatePengajuan: date?.to?.toISOString(),
                keterangan: keterangan
            }
            const res = await pengajuanAbsensiFetch(payload)
            toast.success(res.data.msg)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            ristoan
            backgroundClose
        >
            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm text-neutral-500">Jenis Pengajuan</label>
                    <DropDown
                        onSelect={(e) => setPengajuan(e)}
                        options={options}
                        pengajuan
                        placeholder="― pilih pengajuan ―"
                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm text-neutral-500">Tanggal Pengajuan</label>
                    <KalenderPengajuan date={date} setDate={setDate} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm text-neutral-500">Keterangan</label>
                    <input onChange={(e) => setKeterangan(e.target.value)} type="text" placeholder="― tulis keterangan ―" className="py-[15px] px-5 bg-transparent placeholder:text-sm placeholder:text-neutral-500/65 outline-none focus:border-2 text-off-white w-full border-2 rounded-md border-off-white" />
                </div>
                <ButtonSpan
                    aksata
                    type="submit"
                    fill="bg-neutral-300"
                    rounded="lg"
                    fullWidth
                    classname="mt-5"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    SUBMIT
                </ButtonSpan>
            </div>
        </Modal>
    )
}

export default CutiLemburModal