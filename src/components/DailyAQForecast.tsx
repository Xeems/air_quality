"use client";

import { Card, CardDescription, CardHeader, } from './ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Bar, BarChart, BarShapeProps, CartesianGrid, Rectangle, XAxis } from 'recharts'

const chartData = [
  { time: "00:00", aqi: 35 },
  { time: "04:00", aqi: 42 },
  { time: "08:00", aqi: 75 },
  { time: "12:00", aqi: 110 },
  { time: "16:00", aqi: 145 },
  { time: "20:00", aqi: 90 },
  { time: "24:00", aqi: 55 },
]

const chartConfig = {
  aqi: {
    label: "Индекс AQI",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const getAQIColor = (aqi: number) => {
  let color: string
  if (aqi <= 50) color = "#22c55e"   // Зеленый (Tailwind green-500)
  else if (aqi <= 100) color = "#eab308"  // Желтый (Tailwind yellow-500)
  else if (aqi <= 150) color = "#f97316"  // Оранжевый (Tailwind orange-500)
  else color = "#ef4444"                  // Красный (Tailwind red-500)
  return color
}

const AQIBar = (props: BarShapeProps) => {
  // @ts-expect-error Recharts does spread MarketCandle on the props but the types don't reflect that
   const color = getAQIColor(props.value)

   return <Rectangle {...props} fill={color} stroke="none" />;
}

export default function DailyAQForecast() {
  return (
    <Card className='w-full max-w-6xl'>
      <CardHeader>
        <CardDescription className="text-md text-muted-foreground w-full flex flex-row justify-between">
          <span>Прооогноз качества воздуха на день</span>
        </CardDescription>
      </CardHeader>

      <ChartContainer config={chartConfig} className="min-h-[200px] max-w-xl w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            maxBarSize={16} 
            dataKey="aqi"
            radius={4}
            shape={AQIBar}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
