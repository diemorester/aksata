import { Calendar } from "@/components/Calendar";
import ListApproval from "../components/ListApproval";

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
