export interface WeatherDTO {
  timestamp: string;          // ISO дата и время наблюдения
  temperature: number;        // Температура (°C)
  feelsLike: number;          // Ощущаемая температура (°C)
  humidity: number;           // Влажность (%)
  weatherCode: number;        // Код погоды WMO (для иконок)
  cloudCover: number;         // Облачность (%)
  pressure: number;           // Давление (гПа)
  windSpeed: number;          // Скорость ветра (км/ч)
  windDirection: number;      // Направление ветра (градусы)
  precipitation: number;      // Осадки всего (мм)
  isDay: boolean;             // День сейчас или ночь
}

export interface AirQualityDTO {
  timestamp: string;          // ISO дата и время наблюдения
  aqi: number;                // Европейский индекс качества воздуха (EAQI)
  pm2_5: number;              // Мелкодисперсная пыль PM2.5 (мкг/м³)
  pm10: number;               // Крупная пыль PM10 (мкг/м³)
  co: number;                 // Угарный газ CO (мкг/м³)
  no2: number;                // Диоксид азота NO2 (мкг/м³)
  so2: number;                // Диоксид серы SO2 (мкг/м³)
  o3: number;                 // Озон O3 (мкг/м³)
  nh3: number | null;         // Аммиак NH3 (мкг/м³, может быть null)
}