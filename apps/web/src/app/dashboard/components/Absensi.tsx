'use client';
import { dateNow, timeNow } from '@/libs/date';
import { clockInFetch, clockOutFetch } from '@/libs/fetch/absensi';
import { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Absensi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const clockIn = async () => {
    setIsLoading(true);
    try {
      const res = await clockInFetch();
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clockOut = async () => {
    setIsLoading(true);
    try {
      const res = await clockOutFetch();
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-neutral-900 flex flex-col justify-between p-3 rounded-lg h-full'>
      {/* <p className="text-end text-sm">{dateNow()}</p> */}
      <p className="text-5xl pt-10 font-semibold text-center">
        {timeNow(new Date())}
      </p>

      <div className="flex flex-col gap-y-2 px-3">
        <div className="flex justify-between items-center text-xs px-1">
          <div>
            <p className="text-start">Clock-in Time</p>
            <p className="text-start">Clock-out Time</p>
          </div>
          <div>
            <p>--/--</p>
            <p>--/--</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 pb-3">
          <button
            type="button"
            onClick={clockIn}
            disabled={isLoading}
            className="text-sm bg-green-400/85 active:scale-95 hover:bg-green-400/60 text-white py-2 px-2 rounded-md w-full"
          >
            Clock In
          </button>
          <button
            type="button"
            onClick={clockOut}
            disabled={isLoading}
            className="active:scale-95 text-sm bg-red-400 text-white hover:bg-red-400/60 py-2 px-2 rounded-md w-full"
          >
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Absensi;
