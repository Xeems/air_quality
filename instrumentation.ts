import { saveMetricsToDb } from '@/lib/DBQueries';
import { AirQualityDTO, WeatherDTO } from './@types';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const cron = await import('node-cron');

        const lat = '53.7575'; 
        const lon = '87.136';

        // Запуск каждую минуту ('*/1 * * * *') для быстрой проверки на localhost // потом перенести на интервал в 1 час ('0 */1 * * *')
        cron.schedule('0 */1 * * *', async () => {
            console.log('--- Запуск фоновой задачи на localhost ---');

            const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1`;
            const airQualityURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia&domains=cams_global`
            try {
                const weatherResponse = await fetch(weatherURL, { cache: 'no-store' });
                const airQualityResponse = await fetch(airQualityURL, {cache: 'no-store'})
                
                if (!weatherResponse.ok || !airQualityResponse.ok) {
                    throw new Error(`Ошибка Open-Meteo. Статус: ${weatherResponse.status || airQualityResponse.status}`);
                }

                const weatherData = await weatherResponse.json();
                const airQualityData = await airQualityResponse.json()
                const data = parseMeteoData(weatherData, airQualityData)
                
                saveMetricsToDb(data.weather, data.airQuality)
                console.log('Данные о погоде успешно получены и записаны');
            } catch (error) {
                console.error('❌ Ошибка фонового запроса:', error);
            }
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseMeteoData(weatherData: any, airQualityData: any) {
  
  const weather: WeatherDTO = {
    timestamp: weatherData.current.time,
    temperature: weatherData.current.temperature_2m,
    feelsLike: weatherData.current.apparent_temperature,
    humidity: weatherData.current.relative_humidity_2m,
    weatherCode: weatherData.current.weather_code,
    cloudCover: weatherData.current.cloud_cover,
    pressure: weatherData.current.pressure_msl,
    windSpeed: weatherData.current.wind_speed_10m,
    windDirection: weatherData.current.wind_direction_10m,
    precipitation: weatherData.current.precipitation,
    isDay: weatherData.current.is_day === 1,
  };

  const airQuality: AirQualityDTO = {
    timestamp: airQualityData.current.time,
    aqi: airQualityData.current.european_aqi,
    pm2_5: airQualityData.current.pm2_5,
    pm10: airQualityData.current.pm10,
    co: airQualityData.current.carbon_monoxide,
    no2: airQualityData.current.nitrogen_dioxide,
    so2: airQualityData.current.sulphur_dioxide,
    o3: airQualityData.current.ozone,
    nh3: airQualityData.current.ammonia, // Здесь вернется null, так как Open-Meteo не замерил его
  };

  return { weather, airQuality };
}