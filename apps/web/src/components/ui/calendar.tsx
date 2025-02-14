"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import clsx from "clsx"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

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
      className={cn("px-8", className)}
      classNames={{
        month: clsx(
          'space-y-4 bg-neutral-900 px-2 py-3 rounded-lg text-off-white text-center',
          numberOfMonths === 12 && 'px-3'
        ),
        months: clsx(
          '',
          numberOfMonths === 12 && 'grid md:grid-cols-3 gap-3 w-fit'
        ),
        caption: "flex justify-center relative items-center py-3",
        caption_label: "text-xl font-semibold",
        nav: clsx('space-x-1 flex items-center',
          numberOfMonths === 12 && 'hidden'
        ),
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          numberOfMonths === 12 && 'hidden'
        ),
        nav_button_previous: clsx(
          'absolute left-1',
          numberOfMonths === 12 && 'hidden'
        ),
        nav_button_next: clsx(
          'absolute right-1',
          numberOfMonths === 12 && 'hidden'
        ),
        table: "w-fit border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-off-white w-full font-medium text-center",
        row: "flex w-full mt-2",
        cell: cn(
          "relative text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-11 w-11 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "text-amber-500",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30 aria-selected:rounded-none focus:rounded-lg",
        day_disabled: "text-red-500",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      numberOfMonths={numberOfMonths}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }