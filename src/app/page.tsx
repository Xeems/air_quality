'use client'

import AQIHistoryChart from '@/components/AQIHistoryChart';
import CurrentAQCard from '@/components/CurrentAQCard';
import DailyAQForecast from '@/components/DailyAQForecast';
import ThreeDaysForecat from '@/components/ThreeDaysForecat';
import dynamic from 'next/dynamic';

// Импортируем карту динамически, отключая SSR
const CityMap= dynamic(() => import('@/components/CityMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-neutral-900 flex items-center justify-center text-white font-sans">
      Загрузка 3D-карты Новокузнецка...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-y-8 items-center justify-center overflow-hidden my-8">
      <div className='max-w-6xl h-[400px] w-full overflow-hidden border  rounded-2xl  shadow-2xl'>
        <CityMap />
      </div>
      <CurrentAQCard/>
      <DailyAQForecast/>
      <ThreeDaysForecat/>
      <AQIHistoryChart/>
    </main>
  );
}