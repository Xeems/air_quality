import AQIHistoryChart from '@/components/AQIHistoryChart';
import CurrentAQCard from '@/components/CurrentAQCard';
import DailyAQForecast from '@/components/DailyAQForecast';
import MapWrapper from '@/components/MapWrapper';
import ThreeDaysForecat from '@/components/ThreeDaysForecat';
import { getLatestMetrics } from '@/lib/DBQueries';

export default async function Home() {
  const data = await getLatestMetrics()

  if(!data.weather || !data.airQuality)
    return <div>ничего не найдено</div>

  return (
    <main className="w-full flex flex-col gap-y-8 items-center justify-center overflow-hidden my-8">
      <div className='max-w-6xl h-[400px] w-full overflow-hidden border  rounded-2xl  shadow-2xl'>
        <MapWrapper/>
      </div>
      <CurrentAQCard AQIData={data.airQuality} WeatherData={data.weather}/>
      <DailyAQForecast/>
      <ThreeDaysForecat/>
      <AQIHistoryChart/>
    </main>
  );
}