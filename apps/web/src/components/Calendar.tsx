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
        day: 'h-9 w-9 p-0 text-center aria-selected:opacity-100 rounded-lg',
        weekday: 'py-3 px-4',
        today: 'text-amber-500',
        day_selected: clsx(
          'bg-white',
          numberOfMonths === 12 && 'rounded-full',
        ),
        day_range_middle: "aria:selected:bg-white",
        day_range_end: "day-range-end",
        // range_start: 'rounded-l-full bg-neutral-600',
        // range_end: 'rounded-r-full bg-neutral-600',
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-white [&:has([aria-selected])]:bg-off-white first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
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
          'text-off-white bg-neutral-900 rounded-lg px-3 pb-2 pt-16',
          numberOfMonths === 12 && 'pt-1 pb-2 bg-neutral-950'
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