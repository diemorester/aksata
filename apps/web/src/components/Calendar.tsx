import React from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

interface CalendarProps {
    date: DateRange | undefined;
    onSelect: (selected: DateRange | undefined) => void;
    numberOfMonth: number;
    // modes: "single" | "multiple" | "range" | undefined
}

const Calendar: React.FC<CalendarProps> = ({ date, onSelect, numberOfMonth }) => {
    return (
        <DayPicker
            mode="range"
            showOutsideDays 
            classNames={{
                day: "py-3 px-4 text-center text-off-white",
                today: 'text-green-300',
                selected: "bg-neutral-600 p-1",
                range_middle: "bg-gray-300/50",
                range_start: "rounded-l-full",
                range_end: "rounded-r-full",
                disabled: "text-rose-400",
                button_next: "fill-off-white",
                button_previous: "fill-off-white",
                month: "text-off-white",
                outside: "text-off-white/30"
            }}
            disabled={{ dayOfWeek: [0, 6] }}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={numberOfMonth}
        />
    )
}

export default Calendar