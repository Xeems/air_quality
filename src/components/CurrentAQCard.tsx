import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card'
import {CircleGaugeIcon, ThermometerIcon, TrendingUp, WindIcon} from 'lucide-react'

export default function CurrentAQCard() {
  return (
    <Card className='w-full max-w-6xl font-mono'>
        <CardHeader >
            <CardDescription className="text-md text-muted-foreground w-full flex flex-row justify-between">
                <span>Текущее качество воздуха</span>
                <span className='text-green-500 inline-flex gap-2'><TrendingUp/>Ожидается улучшение</span>
            </CardDescription>
            
            <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-6 w-full">
                
                <div className="flex flex-row items-center gap-6">
                <CardTitle className="font-medium py-0 text-8xl tracking-tighter text-yellow-400">
                    51
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
        <CardFooter className='justify-end gap-4'>
            <span className="flex flex-row items-center gap-2"><WindIcon size={18}/>5 м/с,З</span>
            <span className="flex flex-row items-center gap-1"><ThermometerIcon size={18}/>8°</span>
            <span className="flex flex-row items-center gap-2"><CircleGaugeIcon size={18}/>744</span>
        </CardFooter>
    </Card>
  )
}
