"use client"; 

import dynamic from 'next/dynamic';

const CityMap = dynamic(() => import('@/components/CityMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-500 animate-pulse">
      Загрузка карты canvas...
    </div>
  ),
});

export default function MapWrapper() {
  return <CityMap />;
}
