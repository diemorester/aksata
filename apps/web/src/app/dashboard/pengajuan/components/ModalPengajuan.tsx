'use client';

import ButtonSpan from '@/components/buttons/spanButtons';
import Modal from '@/components/Modal';
import { FaAngleDown, FaRegCalendar } from 'react-icons/fa6';

interface ModalPengajuanProps {
  date: Date | undefined;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  variantPengajuan: 'LEMBUR' | 'PERDIN';
  setKeterangan: React.Dispatch<React.SetStateAction<string>>
  durationHours: number | undefined;
  setDurationHours: React.Dispatch<React.SetStateAction<number | undefined>>
  setKota: React.Dispatch<React.SetStateAction<string>>
  handleSubmitPengajuan: () => void;
  handleChangeVariantPengajuan: () => void;
}

const ModalPengajuan: React.FC<ModalPengajuanProps> = ({
  date,
  isOpen,
  isLoading,
  onClose,
  variantPengajuan,
  setKeterangan,
  durationHours,
  setDurationHours,
  setKota,
  handleSubmitPengajuan,
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
            <div className='flex px-2 items-center text-off-white pt-2'>
              <div className='w-1/3'>
                <p>Durasi Lembur</p>
              </div>
              <div className='w-2/3 h-14 flex justify-end gap-8 items-center text-center'>
                <div className='flex items-center'>
                  <button
                    onClick={() => setDurationHours(durationHours! - 1)}
                    disabled={durationHours! <= 1}
                    className='w-5 h-5 rounded-full text-xs border hover:bg-off-white/85 hover:text-black active:scale-95 hover:border-none disabled:cursor-not-allowed disabled:scale-100'
                  >
                    -
                  </button>
                  <p className='w-12 px-3 text-lg font-semibold'>{durationHours}</p>
                  <button
                    onClick={() => setDurationHours(durationHours! + 1)}
                    disabled={durationHours! >= 7}
                    className='w-5 h-5 rounded-full text-xs border hover:bg-off-white/85 hover:text-black active:scale-95 hover:border-none disabled:cursor-not-allowed disabled:scale-100'
                  >
                    +
                  </button>
                </div>
                <div className='font-extralight'>Jam</div>
              </div>
            </div>
          ) : (
            <div className='flex items-center text-off-white pt-2'>
              <div className='px-2 w-1/3'>
                <p>Kota Tujuan</p>
              </div>
              <div className='w-2/3'>
                <input onChange={(e) => setKota(e.target.value)} className='w-full h-14 px-5 placeholder:text-left text-left resize-none bg-transparent border-2 outline-none border-off-white text-off-white rounded-md'></input>
              </div>
            </div>
          )}
          <div className='px-2 py-9 flex text-off-white'>
            <div className='w-1/3'>
              <p className=''>Tanggal</p>
            </div>
            <div className='flex justify-end gap-3 items-center w-2/3'>
              <FaRegCalendar />
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
              Keterangan
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