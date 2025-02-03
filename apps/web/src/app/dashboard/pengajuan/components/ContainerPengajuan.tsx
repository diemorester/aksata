import { Calendar } from "@/components/ui/calendar";

export default function ContainerPengajuan() {
  return (
    <div className="min-h-screen relative">
      <div className="min-[1225px]:absolute min-[1225px]:right-[2%]">
        <Calendar
          mode="single"
          numberOfMonths={12}
        />
      </div>
    </div>
  )
}