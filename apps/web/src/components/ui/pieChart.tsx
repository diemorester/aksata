"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import usePieUser from "@/hooks/usePieUser"

export function PieChartComponent() {
    // const totalVisitors = React.useMemo(() => {
    //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    // }, [])

    const { data } = usePieUser();

    const chartData = [
        { browser: "alpha", visitors: data?.alpha, fill: "var(--color-alpha)" },
        { browser: "hadir", visitors: data?.hadir, fill: "var(--color-hadir)" },
        { browser: "sakit", visitors: data?.sakit, fill: "var(--color-sakit)" },
        { browser: "cuti", visitors: data?.cuti, fill: "var(--color-cuti)" },
        { browser: "izin", visitors: data?.izin, fill: "var(--color-izin)" },
    ]
    
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        alpha: {
            label: "Alpha",
            color: "#E34234",
        },
        hadir: {
            label: "Hadir",
            color: "#50C878",
        },
        sakit: {
            label: "Sakit",
            color: "#FCF55F",
        },
        cuti: {
            label: "Cuti",
            color: "#4169E1",
        },
        izin: {
            label: "Izin",
            color: "#DA70D6",
        },
    } satisfies ChartConfig

    return (
        <Card className="flex flex-col w-full h-full bg-neutral-950 border-none text-off-white">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-sm">Absensi</CardTitle>
                <CardDescription className="text-xs text-neutral-300">Januari 2025</CardDescription>
            </CardHeader>
            <CardContent className="w-full h-full flex items-center justify-center">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                >
                    <PieChart width={168} height={168}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius="77%"
                            outerRadius="100%"
                            strokeWidth={5}
                            className="w-full h-full"
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-off-white text-3xl font-bold"
                                                >
                                                    {data?.total}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Absen
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

