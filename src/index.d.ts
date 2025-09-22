export type SearchResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
} | null;

export type DailyForecast = {
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  weather_code: number;
};

export type HourlyForecast = {
  time: string;
  day: string;
  temperature_2m: number;
  weather_code: number;
};

export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units?: {
    time: string;
    interval: string;
    weather_code: string;
    precipitation: string;
    wind_speed_10m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    temperature_2m: string;
  };

  current: {
    time: string;
    interval: number;
    weather_code: number;
    precipitation: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    temperature_2m: number;
  };

  hourly_units?: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };

  daily_units?: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};
