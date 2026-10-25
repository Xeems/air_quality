'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'
import { Bar, BarChart, BarShapeProps, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts'
import { ArrowDown, ArrowUp } from 'lucide-react'

const historyData = [
  { time: "9:01pm", date: "17-10-2026", aqi: 54 },
  { time: "10:31pm", date: "17-10-2026", aqi: 65 }, 
  { time: "12:01am", date: "18-10-2026", aqi: 28 },
  { time: "1:31am", date: "18-10-2026", aqi: 33 },
  { time: "3:01am", date: "18-10-2026", aqi: 42 },
  { time: "4:31am", date: "18-10-2026", aqi: 25 },
  { time: "6:01am", date: "18-10-2026", aqi: 16 },
  { time: "7:01am", date: "18-10-2026", aqi: 12 }, 
  { time: "8:01am", date: "18-10-2026", aqi: 32 },
  { time: "10:31am", date: "18-10-2026", aqi: 24 },
  { time: "12:01pm", date: "18-10-2026", aqi: 29 },
  { time: "1:31pm", date: "18-10-2026", aqi: 25 },
  { time: "3:01pm", date: "18-10-2026", aqi: 12 },
  { time: "4:31pm", date: "18-10-2026", aqi: 20 },
  { time: "6:01pm", date: "18-10-2026", aqi: 46 },
  { time: "7:31pm", date: "18-10-2026", aqi: 20 },
  { time: "9:01pm", date: "18-10-2026", aqi: 38 },
]

const chartConfig = {
  aqi: {
    label: "AQI (US)",
    color: "#22c55e",
  },
} satisfies ChartConfig


const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#84cc16"   
  if (aqi <= 100) return "#eab308"  
  if (aqi <= 150) return "#f97316" 
  return "#ef4444"                  
}

const AQIBar = (props: BarShapeProps) => {
  const { value } = props
  const currentAqi = Array.isArray(value) ? value[1] : value
  const color = getAQIColor(Number(currentAqi) || 0)

  return <Rectangle {...props} fill={color} stroke="none" />
}

export default function AQIHistoryChart() {
  return (
    <Card className='w-full max-w-6xl  border-none shadow-xl p-4'>
      
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-6">
        <CardTitle>
            История качества воздуха
        </CardTitle>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 border  p-1.5 pr-4 rounded-xl">
            <div className="bg-[#22c55e]  font-black text-sm px-2.5 py-1.5 rounded-lg">12</div>
            <div className="text-left text-[11px] leading-tight text-gray-400">
              <span className="flex items-center gap-0.5 text-[#22c55e] font-medium">
                <ArrowDown className="h-3 w-3" /> Мин. AQI (US)
              </span>
              <span>7:01am</span>
            </div>
          </div>

          <div className="flex items-center gap-3  border  p-1.5 pr-4 rounded-xl">
            <div className="bg-[#eab308] font-black text-sm px-2.5 py-1.5 rounded-lg">65</div>
            <div className="text-left text-[11px] leading-tight text-gray-400">
              <span className="flex items-center gap-0.5 text-[#eab308] font-medium">
                <ArrowUp className="h-3 w-3" /> Макс. AQI (US)
              </span>
              <span>10:01pm</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart 
            accessibilityLayer 
            data={historyData}
            margin={{ left: -20, right: 10, top: 10 }}
          >
            <CartesianGrid vertical={false}  strokeDasharray="0" />
            
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              className="text-[11px] text-gray-500"
            />

            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              domain={[0, 70]}
              className="text-[11px] text-gray-500"
            />
            
            <ChartTooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              content={<ChartTooltipContent />} 
            />
            
            <Bar
              dataKey="aqi"
              radius={4}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              shape={<AQIBar />}
              maxBarSize={16} 
            />
          </BarChart>
        </ChartContainer>

        <div className="w-full flex justify-between px-10 pt-2 text-sm font-bold text-muted-foreground">
          <span>17-10-2026</span>
          <span>Время</span>
          <span>18-10-2026</span>
        </div>
      </CardContent>
    </Card>
  )
}
