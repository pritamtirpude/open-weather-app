import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/forecast?',
});

const searchApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/search?',
});

export const fetchSearch = async (search: string) => {
  const response = await searchApi.get('', {
    params: {
      name: search,
      count: 10,
      language: 'en',
      format: 'json',
    },
  });
  return response.data;
};

export const fetchWeatherData = async (
  latitude: number,
  longitude: number,
  timezone: string,
  temperatureUnit: string,
  windSpeedUnit: string,
  precipitationUnit: string,
) => {
  const response = await weatherApi.get('', {
    params: {
      latitude,
      longitude,
      current:
        'weather_code,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature,temperature_2m',
      hourly: 'temperature_2m,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone,
      temperature_unit: temperatureUnit,
      wind_speed_unit: windSpeedUnit,
      precipitation_unit: precipitationUnit,
    },
  });
  return response.data;
};
