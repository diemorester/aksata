'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import ModalPengajuan from './ModalPengajuan';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import useLemburPerdin from '@/hooks/useLemburPerdin';

// Dua jenis pengajuan
// 1. Pengajuan lembur
// 2. Pengajuan PERDIN
// Intinya ada dua tab --> Tab Lembur dan Tab PERDIN

// Content dari lembur option dropdown jenis lembur, keterangan lembur.
// Content dari PERDIN option dropdown jenis lembur, keterangan PERDIN.

type VariantPengajuan = 'LEMBUR' | 'PERDIN';

export default function ContainerPengajuan() {
  const [variantPengajuan, setVariantPengajuan] =
    useState<VariantPengajuan>('LEMBUR');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLemburPerdin();

  // Kirim ke BE
  const [date, setDate] = useState<Date | undefined>();
  const [selectLembur, setSelectLembur] = useState<string>('');
  const [keterangan, setKeterangan] = useState('');

  const handleChangeVariantPengajuan = () => {
    if (variantPengajuan === 'LEMBUR') {
      setVariantPengajuan('PERDIN');
    } else {
      setVariantPengajuan('LEMBUR');
    }
  };

  const optionLembur = [
    {
      label: 'Lembur 1',
      value: 'LemburSatu',
    },
    {
      label: 'Lembur 2',
      value: 'LemburDua',
    },
    {
      label: 'Lembur 1 & 2',
      value: 'LemburTiga',
    },
  ];

  const handleSubmitPengajuan = async () => {
    if (variantPengajuan === 'LEMBUR') {
      const payload = {
        date: date?.toISOString(),
        keterangan: keterangan,
        tipePengajuan: selectLembur
      }
      try {
        const res = await mutateAsync(payload) 
        toast.success('Pengajuan telah disubmit');
        setIsOpenModal(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data)
        }
      }
    }

    if (variantPengajuan === 'PERDIN') {
      const payload = {
        date: date?.toISOString(),
        keterangan: keterangan,
        tipePengajuan: 'PerjalananDinas'
      }
      try {
        await mutateAsync(payload);
        toast.success('Pengajuan telah disubmit');
        setIsOpenModal(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data)
        }
      }
    }
  };

  const handleSelectOptionLembur = (value: string) => {
    setSelectLembur(value);
  };

  return (
    <div className="min-h-screen relative">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={12}
          onDayClick={() => setIsOpenModal(true)}
        />
      </div>
      <ModalPengajuan
        date={date}
        isOpen={isOpenModal}
        isLoading={isPending}
        optionLembur={optionLembur}
        variantPengajuan={variantPengajuan}
        setKeterangan={setKeterangan}
        onClose={() => setIsOpenModal(false)}
        handleSubmitPengajuan={handleSubmitPengajuan}
        handleChangeVariantPengajuan={handleChangeVariantPengajuan}
        handleSelectOptionLembur={(value) => handleSelectOptionLembur(value)}
      />
    </div>
  );
}
