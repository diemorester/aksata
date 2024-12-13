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
    <div>
      <p className="text-end text-sm">{dateNow()}</p>
      <p className="text-3xl mt-7 font-semibold text-center">
        {timeNow(new Date())}
      </p>

      <div className="flex flex-col gap-y-2 mt-10">
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-start">Clock-in Time</p>
            <p className="text-start">Clock-out Time</p>
          </div>
          <div>
            <p>--/--</p>
            <p>--/--</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={clockIn}
            disabled={isLoading}
            className="bg-green-400 text-black py-2 px-2 rounded-md w-full"
          >
            Clock In
          </button>
          <button
            type="button"
            onClick={clockOut}
            disabled={isLoading}
            className="bg-red-400 text-black py-2 px-2 rounded-md w-full"
          >
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Absensi;
