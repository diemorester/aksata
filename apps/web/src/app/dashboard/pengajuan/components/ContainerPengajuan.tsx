'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import ModalPengajuan from './ModalPengajuan';

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

  // Kirim ke BE
  const [date, setDate] = useState<Date | undefined>();
  const [selectLembur, setSelectLembur] = useState<string>('');
  const [selectPerdin, setSelectPerdin] = useState<string>('');
  const [keterangan, setKeterangan] = useState<string>('');

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

  const optionsPerdin = [
    {
      value: 'PILIH ACUUU',
      label: '',
    },
  ];

  const handleSubmitPengajuan = () => {
    if (variantPengajuan === 'LEMBUR') {
      // Axios lembur
      alert('LEMBUR BANGGG!!!');
    }

    if (variantPengajuan === 'PERDIN') {
      // Axios perdin
      alert('PERDIN BANGGGG!!!');
    }
  };

  const handleSelectOptionLembur = (value: string) => {
    // Code
    setSelectLembur(value);
  };

  const handleSelectOptionPerdin = (value: string) => {
    // Code
    setSelectPerdin(value);
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
        optionLembur={optionLembur}
        variantPengajuan={variantPengajuan}
        onClose={() => setIsOpenModal(false)}
        handleSubmitPengajuan={handleSubmitPengajuan}
        handleChangeVariantPengajuan={handleChangeVariantPengajuan}
        handleSelectOptionLembur={(value) => handleSelectOptionLembur(value)}
      />
    </div>
  );
}
