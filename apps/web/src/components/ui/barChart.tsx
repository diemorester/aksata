'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { piePeriod } from '@/libs/date';

const chartData = [
  { visitors: 'Senin', desktop: 186, mobile: 80 },
  { visitors: 'Selasa', desktop: 305, mobile: 200 },
  { visitors: 'Rabu', desktop: 237, mobile: 120 },
  { visitors: 'Kamis', desktop: 73, mobile: 190 },
  { visitors: 'Jumat', desktop: 209, mobile: 130 },
];

const chartConfig = {
  desktop: {
    label: 'Clockin',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Clockout',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card className="flex flex-col w-full h-full justify-between bg-black border-none text-off-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm">Absensi</CardTitle>
        <CardDescription className="text-xs text-neutral-300">
          {piePeriod()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="visitors"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
