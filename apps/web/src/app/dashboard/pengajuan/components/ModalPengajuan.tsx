'use client';

import ButtonSpan from '@/components/buttons/spanButtons';
import DropDown from '@/components/dropdowns/dropDown';
import Modal from '@/components/Modal';
import { FaAngleDown, FaArrowRightLong  } from 'react-icons/fa6';

interface ModalPengajuanProps {
  date: Date | undefined;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  variantPengajuan: 'LEMBUR' | 'PERDIN';
  optionLembur: { label: string; value: string }[];
  setKeterangan: React.Dispatch<React.SetStateAction<string>>
  handleSubmitPengajuan: () => void;
  handleSelectOptionLembur: (value: string) => void;
  handleChangeVariantPengajuan: () => void;
}

const ModalPengajuan: React.FC<ModalPengajuanProps> = ({
  date,
  isOpen,
  isLoading,
  onClose,
  optionLembur,
  variantPengajuan,
  setKeterangan,
  handleSubmitPengajuan,
  handleSelectOptionLembur,
  handleChangeVariantPengajuan,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} ristoan backgroundClose>
      <div className="flex flex-col">
        <div className='flex justify-center'>
          {["LEMBUR", "PERDIN"].map((tab) => (
            <button
              key={tab}
              onClick={handleChangeVariantPengajuan}
              className={`relative flex-1 py-3 tracking-wider text-center hover:bg-white/15 font-semibold transition ${variantPengajuan === tab ? "text-off-white border-b-2" : "text-neutral-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-b-[1px] border-t-[1px] py-5 border-neutral-500">
          {variantPengajuan === 'LEMBUR' ? (
            <div className='flex items-center text-off-white'>
              <div className='px-2 w-1/3'>
                <p>Tipe Lembur</p>
              </div>
              <div className='w-2/3'>
                <DropDown
                  pengajuan
                  options={optionLembur}
                  placeholder="Pilih jenis pengajuan"
                  onSelect={handleSelectOptionLembur}
                />
              </div>
            </div>
          ) : (
            <div className='flex items-center text-off-white'>
              <div className='px-2 w-1/3'>
                <p>Tipe Perdin</p>
              </div>
              <div className='w-2/3 flex justify-between items-center hover:cursor-not-allowed text-center border-2 border-neutral-500 text-neutral-500 py-[15px] px-5 rounded-md'>
                <p>Luar Jabodetabek</p>
                <FaAngleDown />
              </div>
            </div>
          )}
          <div className='px-2 py-9 flex text-off-white'>
            <div className='w-1/3'>
              <p className=''>Tanggal</p>
            </div>
            <div className='flex justify-around items-center w-2/3'>
              <p className='font-extralight'>
                {date?.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>
              <FaArrowRightLong />
              <p className='font-extralight'>
                {date?.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>
          <div className='flex justify-between text-off-white'>
            <div className='px-2 pt-4 w-1/3'>
              {variantPengajuan === 'LEMBUR' ? 'Tipe Lembur' : 'Tipe Perdin'}
            </div>
            <div className='w-2/3'>
              <textarea
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="― tulis keterangan ―"
                className="py-3 px-5 h-32 bg-transparent placeholder:text-left placeholder:align-top placeholder:text-neutral-500/65 outline-none focus:border-2 text-off-white w-full border-2 rounded-md border-off-white resize-none overflow-hidden text-ellipsis"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-5 gap-x-8">
          <ButtonSpan
            onClick={onClose}
            type="submit"
            ristoan
            classname="text-off-white"
          >
            Batal
          </ButtonSpan>
          <ButtonSpan
            type="submit"
            ristoan
            fill="bg-neutral-300"
            rounded='lg'
            disabled={isLoading}
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