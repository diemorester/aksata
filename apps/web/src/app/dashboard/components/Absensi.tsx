'use client';
import useGetAbsensiByUserId from '@/hooks/absensi/useGetAbsensiByUserId';
import useGetAllAbsensiByUserId from '@/hooks/absensi/useGetAllAbsensiByUserId';
import usePostClockIn from '@/hooks/useClockIn';
import { hourFormat, timeNow } from '@/libs/date';
import { clockOutFetch } from '@/libs/fetch/absensi';
import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Absensi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = usePostClockIn();
  const { data, revalidate } = useGetAbsensiByUserId();
  const { revalidate: revalidateCalendar } = useGetAllAbsensiByUserId();

  const handleClockIn = async () => {
    setIsLoading(true);
    try {
      const res = await mutateAsync();
      toast.success(res.msg);
      revalidate();
      revalidateCalendar();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    try {
      const res = await clockOutFetch();
      toast.success(res.data.msg);
      revalidate();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <p className="text-4xl pt-10 font-semibold text-off-white text-center">
        {timeNow(new Date())}
      </p>

      <div className="flex flex-col gap-y-3 px-3">
        <div className="flex justify-between items-center px-1">
          <div>
            <p className="text-xs text-start">Clock-in Time</p>
            <p className="text-xs text-start">Clock-out Time</p>
          </div>
          <div>
            <p className="text-xs font-extrabold text-off-white">
              {data?.absensi?.isActive && data?.absensi?.clockIn
                ? hourFormat(data.absensi.clockIn)
                : "--/--"}
            </p>
            <p className="text-xs font-extrabold text-off-white">
              {data?.absensi?.isActive && data?.absensi?.clockOut
                ? hourFormat(data.absensi.clockOut)
                : "--/--"}
            </p>
          </div>
        </div>

        <span className='border-t border-neutral-500 w-full'></span>

        <div className="flex items-center justify-between gap-5 pb-3">
          <button
            type="button"
            onClick={handleClockIn}
            disabled={isLoading}
            className="text-sm bg-green-400/85 active:scale-95 hover:bg-green-400/60 text-white py-2 px-2 rounded-md w-full"
          >
            Clock In
          </button>
          <button
            type="button"
            onClick={handleClockOut}
            disabled={isLoading}
            className="active:scale-95 text-sm bg-[#E34234] text-white disabled:cursor-not-allowed disabled:active:scale-100 hover:bg-[#E34234]/75 py-2 px-2 rounded-md w-full"
          >
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Absensi;
