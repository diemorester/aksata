import { Calendar } from "@/components/ui/calendar";

const AbsensiHistory = () => {
  return (
    <Calendar
      numberOfMonths={1}
      className="p-1"
      classNames={{
        day: 'h-8 w-8 text-xs rounded-full flex items-center justify-center',
        caption_label: 'hidden',
        caption: 'hidden',
        month: 'p-0',
        nav: 'hidden',
        head_cell: 'pb-4 pt-1 text-off-white w-full font-semibold text-center',
      }}
    />
  );
};

export default AbsensiHistory;
