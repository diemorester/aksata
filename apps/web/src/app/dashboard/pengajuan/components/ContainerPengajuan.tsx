'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import ModalPengajuan from './ModalPengajuan';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import useLemburPerdin from '@/hooks/useLemburPerdin';

type VariantPengajuan = 'LEMBUR' | 'PERDIN';

export default function ContainerPengajuan() {
  const [variantPengajuan, setVariantPengajuan] =
    useState<VariantPengajuan>('LEMBUR');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLemburPerdin();

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

  const thisYear = new Date().getFullYear();
  const january = new Date(thisYear, 0, 1);

  return (
    <div className="min-h-screen relative">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={12}
          defaultMonth={january}
          modifiers={{
            weekEnd: (day) => day.getDay() == 0 || day.getDay() == 6
          }}
          modifiersClassNames={{
            weekEnd: 'text-red-500'
          }}
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
