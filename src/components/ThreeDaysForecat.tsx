import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { AlertTriangleIcon, ShieldAlertIcon, Smile, SmileIcon } from 'lucide-react'

const threeDayData = [
    {
        day: "Сегодня",
        date: "19 октября",
        minAqi: 35,
        maxAqi: 75,
        avgAqi: 56,
        status: "Умеренно",
        colorClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200/50",
        icon: <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />,
        recommendation: "Чувствительным людям лучше сократить долгие прогулки."
    },
    {
        day: "Завтра",
        date: "20 октября",
        minAqi: 60,
        maxAqi: 150,
        avgAqi: 112,
        status: "Вредно",
        colorClass: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200/50",
        icon: <ShieldAlertIcon className="h-5 w-5 text-red-500" />,
        recommendation: "Закрывайте окна. Рекомендуется использовать очиститель воздуха."
    },
    {
        day: "Среда",
        date: "21 октября",
        minAqi: 30,
        maxAqi: 52,
        avgAqi: 42,
        status: "Отлично",
        colorClass: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50",
        icon: <SmileIcon className="h-5 w-5 text-green-500" />,
        recommendation: "Прекрасное время для прогулок и проветривания помещений."
    }
]

export default function ThreeDaysForecat() {
    return (
        <Card className='w-full max-w-6xl font-mono py-4'>
            <CardHeader >
                <CardDescription className="text-md text-muted-foreground w-full flex flex-row justify-between">
                    <span>Пргноз качества воздуха на 3 дня</span>
                </CardDescription>
            </CardHeader>
            <CardContent >
                <div className='flex flex-row gap-2'>
                    {threeDayData.map((data, index) => (
                        <Card key={index} className="flex flex-col justify-between border-muted/60 shadow-sm">

                            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                                <div>
                                    <CardTitle className="text-base font-bold">{data.day}</CardTitle>
                                    <CardDescription className="text-xs">{data.date}</CardDescription>
                                </div>

                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${data.colorClass}`}>
                                    {data.icon}
                                    {data.status}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-baseline justify-between border-b border-muted pb-3">
                                    <div>
                                        <span className="text-3xl font-black tracking-tight">{data.avgAqi}</span>
                                        <span className="text-[10px] text-muted-foreground ml-1 font-mediumUI uppercase">AQI средний</span>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-xs font-semibold text-muted-foreground block">Диапазон</span>
                                        <span className="text-xs font-bold text-foreground">
                                            {data.minAqi} – {data.maxAqi} AQI
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {data.recommendation}
                                </p>
                            </CardContent>

                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
