"use client"

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import ModalPengajuan from "./ModalPengajuan";

export default function ContainerPengajuan() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const options = [
    {
      label: 'Lembur 1',
      value: 'Lembur 1'
    },
    {
      label: 'Lembur 2',
      value: 'Lembur 2'
    },
    {
      label: 'Lembur 1 & 2',
      value: 'Lembur 1 & 2'
    }
  ]

  return (
    <div className="min-h-screen relative">
      <div className="min-[1225px]:absolute min-[1225px]:right-[2%]">
        <Calendar
          mode="single"
          numberOfMonths={12}
          onDayClick={() => setIsOpenModal(true)}
        />
      </div>
      <ModalPengajuan isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  )
}