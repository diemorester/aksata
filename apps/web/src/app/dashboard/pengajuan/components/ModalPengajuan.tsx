'use client';

import ButtonSpan from '@/components/buttons/spanButtons';
import DropDown from '@/components/dropdowns/dropDown';
import Input from '@/components/input/input';
import Modal from '@/components/Modal';
import { useState } from 'react';

interface ModalPengajuanProps {
  date: Date | undefined;
  isOpen: boolean;
  onClose: () => void;
  variantPengajuan: 'LEMBUR' | 'PERDIN';
  optionLembur: { label: string; value: string }[];
  handleSubmitPengajuan: () => void;
  handleSelectOptionLembur: (value: string) => void;
  handleChangeVariantPengajuan: () => void;
}

const ModalPengajuan: React.FC<ModalPengajuanProps> = ({
  date,
  isOpen,
  onClose,
  optionLembur,
  variantPengajuan,
  handleSubmitPengajuan,
  handleSelectOptionLembur,
  handleChangeVariantPengajuan,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} ristoan backgroundClose>
      <div className="flex flex-col">
        <h1 className="font-semibold text-off-white pb-3">Buat Pengajuan</h1>
        <div onClick={handleChangeVariantPengajuan}>TAB</div>
        <div className="flex flex-col border-b-[1px] border-t-[1px] py-3 border-neutral-500">
          <p className="text-off-white text-sm">{date?.toLocaleDateString()}</p>
          {variantPengajuan === 'LEMBUR' ? (
            <DropDown
              pengajuan
              options={optionLembur}
              placeholder="Pilih jenis pengajuan"
              onSelect={handleSelectOptionLembur}
            />
          ) : (
            // Dropdown perdin
            <p>{variantPengajuan}</p>
          )}
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </div>

        <div className="flex justify-end mt-5 gap-x-6">
          <ButtonSpan
            onClick={onClose}
            type="submit"
            ristoan
            classname="text-off-white text-sm"
          >
            Batal
          </ButtonSpan>
          <ButtonSpan
            type="submit"
            ristoan
            fill="bg-green-500"
            classname="text-sm"
            onClick={handleSubmitPengajuan}
          >
            Ajukan
          </ButtonSpan>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPengajuan;
