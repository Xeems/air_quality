
import { AirQualityDTO, WeatherDTO } from '../../@types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card'
import { CircleGaugeIcon, ThermometerIcon, TrendingUp, WindIcon } from 'lucide-react'

type Props = {
    AQIData: AirQualityDTO
    WeatherData: WeatherDTO
}

export default async function CurrentAQCard({ AQIData, WeatherData }: Props) {
    return (
        <Card className='w-full max-w-6xl font-mono'>
            <CardHeader >
                <CardDescription className="text-md text-muted-foreground w-full flex flex-row justify-between">
                    <span>Текущее качество воздуха</span>
                    <span className='text-green-500 inline-flex gap-2'><TrendingUp />Ожидается улучшение</span>
                </CardDescription>

                <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-6 w-full">

                    <div className="flex flex-row items-center gap-6">
                        <CardTitle className="font-medium py-0 text-8xl tracking-tighter text-yellow-400">
                            {AQIData.aqi}
                        </CardTitle>
                        <div>
                            <p className="text-muted-foreground max-w-[600px] text-sm leading-relaxed">
                                Качество воздуха в целом является приемлемым для большинства людей. Однако у людей с повышенной чувствительностью после длительного нахождения на улице могут появляться симптомы малой и средней тяжести.
                            </p>
                        </div>
                    </div>


                </div>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className='justify-between'>
                 <div className='flex flex-wrap flex-row items-center gap-2 text-xs font-semibold'>
                    <div className='border px-2 py-1 rounded-md bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-400'>
                        PM2.5 <span className="font-bold ml-1">{AQIData.pm2_5}</span>
                    </div>
                    <div className='border px-2 py-1 rounded-md bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/40 dark:border-purple-900 dark:text-purple-400'>
                        PM10 <span className="font-bold ml-1">{AQIData.pm10}</span>
                    </div>
                    <div className='border px-2 py-1 rounded-md bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-400'>
                        CO <span className="font-bold ml-1">{AQIData.co}</span>
                    </div>
                    <div className='border px-2 py-1 rounded-md bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'>
                        NO₂ <span className="font-bold ml-1">{AQIData.no2}</span>
                    </div>
                </div>
                <div className='gap-4 flex flex-row items-center'>
                    <span className="flex flex-row items-center gap-2"><WindIcon size={18} />{WeatherData.windSpeed + ' м/с, ' + WeatherData.windDirection + "°"}</span>
                    <span className="flex flex-row items-center gap-1"><ThermometerIcon size={18} />{WeatherData.temperature}°</span>
                    <span className="flex flex-row items-center gap-2"><CircleGaugeIcon size={18} />{WeatherData.pressure} мм</span>
                </div>

            </CardFooter>
        </Card>
    )
}
