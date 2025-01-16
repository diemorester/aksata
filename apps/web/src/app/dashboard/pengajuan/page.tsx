import { DummyCalendar } from "@/components/DummyCalendar";
import { Calendar } from "@/components/ui/calendar";

export default function Pengajuan() {
  return (
    <div className="min-h-screen">
      <Calendar
        mode="single"
        numberOfMonths={12}
      />
    </div>
  )
}
