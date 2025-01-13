'use client';
import clsx from 'clsx';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function DummyCalendar({
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
      // selected: clsx(
      //   'bg-neutral-600 p-1',
      //   numberOfMonths === 12 && 'rounded-full',
      // ),
      // range_middle: 'bg-gray-300/50',
      // range_start: 'rounded-l-full',
      // range_end: 'rounded-r-full',
      // disabled: 'text-rose-400',
      // button_next: clsx('fill-off-white', numberOfMonths === 12 && 'hidden'),
      // button_previous: clsx(
      //   'fill-off-white',
      //   numberOfMonths === 12 && 'hidden',
      // ),
      nav: clsx(
        'flex space-x-1 items-center justify-between px-5 py-2',
        numberOfMonths === 12 && 'hidden',
      ),
      nav_button_next: 'absolute right-1',
      nav_button_previous: 'absolute left-1',
      month: 'text-off-white bg-neutral-800 rounded-lg py-2 px-3',
      months: clsx('', numberOfMonths === 12 && 'grid grid-cols-3 gap-2'),
      // outside: 'text-off-white/30',
      ...classNames,
    }}
    disabled={{ dayOfWeek: [0, 6] }}
    numberOfMonths={numberOfMonths}
    {...props}
    />
  );
}

DummyCalendar.displayName = 'DummyCalendar';
export { DummyCalendar };