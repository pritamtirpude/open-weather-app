import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';
import type { DailyForecast, HourlyForecast } from '../..';
import { fetchSearch, fetchWeatherData } from '../../api';
import { HourlyCard, WeekDayDropdown } from '../../components';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import { useFilterStore } from '../../store/filterStore';
import { useSearchStore } from '../../store/searchStore';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherIcons';
import DailyForecastCard from '../DailyforecastCard/DailyForecastCard';

export default function WeatherGrid() {
  const { selectedDay } = useFilterStore();

  const { params, setParams } = useWeatherParams();
  const { selectedLocation, setSelectedLocation } = useSearchStore();

  // Query for search results based on search param
  const { data: searchData } = useQuery({
    queryKey: ['search', params.search],
    queryFn: () => fetchSearch(params.search!),
    enabled: !!params.search && !selectedLocation,
  });

  // Handle search results
  useEffect(() => {
    if (searchData?.results && searchData.results.length > 0 && !selectedLocation) {
      const firstResult = searchData.results[0];
      setSelectedLocation(firstResult);
      setParams({
        latitude: firstResult.latitude.toFixed(4),
        longitude: firstResult.longitude.toFixed(4),
        timezone: firstResult.timezone || 'auto',
      });
    }
  }, [searchData, selectedLocation, setSelectedLocation, setParams]);

  // Get geolocation if no search param and no location
  useEffect(() => {
    if (!params.search && !params.latitude && !params.longitude && !selectedLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setParams({
              latitude: position.coords.latitude.toFixed(4),
              longitude: position.coords.longitude.toFixed(4),
              timezone: 'auto',
            });
          },
          () => {
            return;
          },
        );
      }
    }
  }, [params.search, params.latitude, params.longitude, selectedLocation, setParams]);

  const { data: weatherData, isLoading } = useQuery({
    queryKey: ['weatherData', params],
    queryFn: () =>
      fetchWeatherData(
        Number(selectedLocation?.latitude ?? params.latitude),
        Number(selectedLocation?.longitude ?? params.longitude),
        selectedLocation?.timezone ?? params.timezone ?? 'GMT',
        params?.temperatureUnit || 'celsius',
        params?.windSpeedUnit || 'kmh',
        params?.precipitationUnit || 'mm',
      ),
    enabled: !!(params.latitude && params.longitude && params.timezone),
  });

  const dailyForecast: DailyForecast[] =
    weatherData?.daily?.time?.map((time: string, index: number) => ({
      time,
      temperature_2m_max: weatherData.daily.temperature_2m_max[index],
      temperature_2m_min: weatherData.daily.temperature_2m_min[index],
      weather_code: weatherData.daily.weather_code[index],
    })) || [];

  const hourlyForecast = weatherData?.hourly?.time?.map((time: string, index: number) => {
    const currentDay = format(new Date(time), 'EEEE');
    return {
      time,
      day: currentDay,
      temperature_2m: weatherData.hourly.temperature_2m[index],
      weather_code: weatherData.hourly.weather_code[index],
    };
  });

  const filteredHourlyForecast = hourlyForecast?.filter(
    (hour: HourlyForecast) => hour.day === selectedDay,
  );

  if (isLoading) {
    return <h2 className="text-2xl text-white">Loading...</h2>;
  }

  if (Object.keys(weatherData || {}).length === 0) {
    return null;
  }

  return (
    <section className="mt-8 grid grid-cols-3 gap-8 lg:mt-12">
      <div className="col-span-full lg:col-span-2">
        <div className="flex h-[286px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[url(/assets/images/bg-today-small.svg)] bg-cover bg-center bg-no-repeat px-6 py-10 md:flex-row md:justify-between md:gap-0 md:bg-[url(/assets/images/bg-today-large.svg)] md:px-6 md:py-0">
          <div>
            {selectedLocation && (
              <h1 className="font-dm-sans text-dm-sans-preset-3 text-white">
                {selectedLocation?.name}, {selectedLocation?.country}
              </h1>
            )}
            <span className="font-dm-sans text-dm-sans-preset-6 text-white/80">
              {format(new Date(), 'EEEE, MMM d, yyyy')}
            </span>
          </div>
          <div className="flex w-[294px] items-center gap-5">
            <img
              src={getWeatherIcon(weatherData?.current?.weather_code || 0)}
              className="size-[120px]"
              alt={getWeatherDescription(weatherData?.current?.weather_code || 0)}
            />
            <span className="font-dm-sans text-dm-sans-preset-1 text-white italic">
              {Math.round(weatherData?.current?.temperature_2m ?? 0)}°
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-full grid size-full grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-2">
        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Feels Like</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">
            {Math.round(weatherData?.current?.apparent_temperature ?? 0)}°
          </span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Humidity</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">
            {weatherData?.current?.relative_humidity_2m}%
          </span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Wind</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">
            {Math.round(weatherData?.current?.wind_speed_10m ?? 0)}{' '}
            {weatherData?.current_units?.wind_speed_10m?.replace('/', '')}
          </span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Precipitation</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">
            {weatherData?.current?.precipitation}{' '}
            {weatherData?.current_units?.precipitation?.replace('inch', 'in')}
          </span>
        </div>
      </div>
      <div className="col-span-full col-start-1 lg:col-span-2 lg:mt-12">
        <h2 className="font-dm-sans text-dm-sans-preset-4 text-white">Daily forecast</h2>

        <div className="mt-5 grid grid-cols-3 gap-4 md:flex md:items-center">
          {dailyForecast.map((day: DailyForecast) => (
            <DailyForecastCard key={day.time} dailyData={day} />
          ))}
        </div>
      </div>

      <div className="bg-weather-800 col-span-full h-full rounded-[20px] px-4 py-5 md:p-6 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-dm-sans text-dm-sans-preset-4 text-white">Hourly forecast</h3>
          <WeekDayDropdown />
        </div>

        <div className="scrollbar-hide mt-4 flex h-[620px] flex-col gap-4 overflow-y-auto">
          {filteredHourlyForecast?.map((hour: HourlyForecast) => (
            <HourlyCard key={hour.time} hour={hour} />
          ))}
        </div>
      </div>
    </section>
  );
}
