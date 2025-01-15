"use client"

import { PieChartComponent } from "@/components/ui/pieChart"
import useAbsensiUser from "@/hooks/useAbsensiUser"

const DataAbsen = () => {
    const { data } = useAbsensiUser()
    // const pieData = [
    //     { status}
    // ]
    
    return (
        <div className="w-full h-full">
            <PieChartComponent/>
        </div>
    )
}

export default DataAbsen