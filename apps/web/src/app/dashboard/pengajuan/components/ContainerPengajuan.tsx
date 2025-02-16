'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import ModalPengajuan from './ModalPengajuan';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import useLemburPerdin from '@/hooks/useLemburPerdin';

type VariantPengajuan = 'LEMBUR' | 'PERDIN';
type TipePengajuan = 'Lembur' | 'Perdin'

export default function ContainerPengajuan() {
  const [variantPengajuan, setVariantPengajuan] = useState<VariantPengajuan>('LEMBUR');
  const [tipePengajuan, setTipePengajuan] = useState<TipePengajuan>('Lembur');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLemburPerdin();

  const [date, setDate] = useState<Date | undefined>();
  const [durationHours, setDurationHours] = useState<number | undefined>(1);
  const [keterangan, setKeterangan] = useState('');
  const [kota, setKota] = useState('');

  const handleChangeVariantPengajuan = () => {
    if (variantPengajuan === 'LEMBUR') {
      setVariantPengajuan('PERDIN');
      setTipePengajuan('Perdin');
    } else {
      setVariantPengajuan('LEMBUR');
      setTipePengajuan('Lembur');
    }
  };

  const handleSubmitPengajuan = async () => {
    if (variantPengajuan === 'LEMBUR') {
      const payload = {
        date: date?.toISOString(),
        keterangan: keterangan,
        tipePengajuan: tipePengajuan,
        durationHours: durationHours,
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
        tipePengajuan: 'PerjalananDinas',
        kota: kota
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

  const thisYear = new Date().getFullYear();
  const january = new Date(thisYear, 0, 1);

  return (
    <div className="w-full min-h-screen relative">
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
        variantPengajuan={variantPengajuan}
        setKeterangan={setKeterangan}
        durationHours={durationHours}
        setDurationHours={setDurationHours}
        setKota={setKota}
        onClose={() => setIsOpenModal(false)}
        handleSubmitPengajuan={handleSubmitPengajuan}
        handleChangeVariantPengajuan={handleChangeVariantPengajuan}
      />
    </div>
  );
}
