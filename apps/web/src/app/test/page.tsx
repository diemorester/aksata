'use client';
import { Calendar } from '@/components/Calendar';
import React, { useState } from 'react';

const Test = () => {
  const [date, setDate] = useState<Date>();

  console.log(date, 'INI TANGGAL');

  return (
    <div className=" rounded-lg flex items-center justify-center w-full ">
      <Calendar
        mode="single"
        numberOfMonths={12}
        selected={date}
        onSelect={setDate}
      />
    </div>
  );
};

export default Test;
