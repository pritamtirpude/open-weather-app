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
