'use client'
import useAbsensi from "@/hooks/useAbsensi";
import CardDataAbsensi from "./cardDataAbsensi";
import { Absensi } from "@/types/absensiTypes";

interface ListCardAbsensiProps {
    attendance: Absensi[];
}
 

const ListCardAbsensi: React.FC<ListCardAbsensiProps> = ({ attendance }) => {   
    console.log(attendance, 'kokookokokokp');
    if (!attendance) {
        return <p>tidak ada wey</p>
    }
    return (
        <>
            {attendance.map((absen) => {
                return <CardDataAbsensi key={absen.id} name={absen.user.name} date={absen.date} clockIn={absen.clockIn} clockOut={absen.clockOut} status={absen.status} />
            })}
        </>
    )
}

export default ListCardAbsensi