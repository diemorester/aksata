'use client';
import clsx from 'clsx';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  numberOfMonths = 1,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx('', className)}
      classNames={{
        day: 'py-3 px-4 text-center text-off-white',
        weekday: 'py-3 px-4',
        today: 'text-amber-500',
        // selected: clsx(
        //   '',
        //   numberOfMonths === 12 && 'rounded-full',
        // ),
        range_middle: 'bg-gray-300/35',
        range_start: 'rounded-l-full bg-neutral-600',
        range_end: 'rounded-r-full bg-neutral-600',
        disabled: 'text-rose-500',
        button_next: clsx('fill-off-white', numberOfMonths === 12 && 'hidden'),
        button_previous: clsx(
          'fill-off-white',
          numberOfMonths === 12 && 'hidden',
        ),
        nav: clsx(
          'absolute right-6 top-6 items-center flex space-x-2 justify-end z-30',
          numberOfMonths === 12 && 'hidden',
        ),
        month: clsx(
          'text-off-white bg-neutral-800 rounded-lg px-3 pb-2 pt-16',
          numberOfMonths === 12 && 'pt-1 pb-2'
        ),
        month_caption: clsx(
          'absolute top-[24px] left-5 text-xl font-semibold text-off-white',
          numberOfMonths === 12 && 'relative pb-12'
        ),
        months: clsx('', numberOfMonths === 12 && 'grid grid-cols-3 gap-2'),
        outside: 'text-opacity-30',
        ...classNames,
      }}
      disabled={{ dayOfWeek: [0, 6] }}
      numberOfMonths={numberOfMonths}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';
export { Calendar };