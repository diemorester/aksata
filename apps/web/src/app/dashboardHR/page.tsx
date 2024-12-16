'use client'
import { useAbsensi } from "@/hooks/useAbsensi"
import { useState } from "react"

export default function DashboardHR() {
    const [kosong, setKosong] = useState('');
    const [kosong2, setKosong2] = useState(1);
    const testing = useAbsensi({ page: kosong2, take: 10})
    console.log(testing);
    
    
    return (
        <div>
            {/* {testing.data?.attendance.clockIn} */}
        </div>
    )
}