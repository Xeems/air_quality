import { AirQualityDTO, WeatherDTO } from '../../@types';
import { pool } from './db';

export async function saveMetricsToDb(weather: WeatherDTO, airQuality: AirQualityDTO) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const weatherQuery = `
      INSERT INTO "WeatherHistory" (
        "timestamp", "temperature", "feelsLike", "humidity", "weatherCode", 
        "cloudCover", "pressure", "windSpeed", "windDirection", "precipitation", "isDay"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
        const weatherValues = [
            weather.timestamp, weather.temperature, weather.feelsLike, weather.humidity, weather.weatherCode,
            weather.cloudCover, weather.pressure, weather.windSpeed, weather.windDirection, weather.precipitation, weather.isDay
        ];
        await client.query(weatherQuery, weatherValues);

        const aqiQuery = `
      INSERT INTO "AirQualityHistory" (
        "timestamp", "aqi", "pm2_5", "pm10", "co", "no2", "so2", "o3", "nh3"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
        const aqiValues = [
            airQuality.timestamp, airQuality.aqi, airQuality.pm2_5, airQuality.pm10,
            airQuality.co, airQuality.no2, airQuality.so2, airQuality.o3, airQuality.nh3
        ];
        await client.query(aqiQuery, aqiValues);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[DB Error] Ошибка транзакции при сохранении метрик:', error);
        throw error;
    } finally {
        client.release();
    }
}


interface LatestMetricsResponse {
  weather: WeatherDTO | null;
  airQuality: AirQualityDTO | null;
}

export async function getLatestMetrics(): Promise<LatestMetricsResponse> {
  const client = await pool.connect();
  try {
    const weatherQuery = `
      SELECT "timestamp", "temperature", "feelsLike", "humidity", "weatherCode", 
             "cloudCover", "pressure", "windSpeed", "windDirection", "precipitation", "isDay"
      FROM "WeatherHistory"
      ORDER BY "timestamp" DESC
      LIMIT 1;
    `;

    const aqiQuery = `
      SELECT "timestamp", "aqi", "pm2_5", "pm10", "co", "no2", "so2", "o3", "nh3"
      FROM "AirQualityHistory"
      ORDER BY "timestamp" DESC
      LIMIT 1;
    `;

    const [weatherResult, aqiResult] = await Promise.all([
      client.query(weatherQuery),
      client.query(aqiQuery)
    ]);

    return {
      weather: weatherResult.rows[0] || null,
      airQuality: aqiResult.rows[0] || null
    };
  } catch (error) {
    console.error('[DB Error] Ошибка при получении актуальных метрик:', error);
    throw error;
  } finally {
    client.release();
  }
}
