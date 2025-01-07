"use client"
import Calendar from '@/components/Calendar'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker';

const Test = () => {
    const [date, setDate] = useState<DateRange | undefined>();
  return (
    <div className='flex flex-wrap'>
        <Calendar 
         date={date}
         onSelect={setDate}
         numberOfMonth={12}
        />
    </div>
  )
}

export default Test