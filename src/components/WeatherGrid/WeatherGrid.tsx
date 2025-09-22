import { format } from 'date-fns';
import { motion } from 'motion/react';
import type { DailyForecast, HourlyForecast, WeatherApiResponse } from '../..';
import {
  CurrentWeatherCard,
  DailyForecastCard,
  HourlyCard,
  LoadingSkeleton,
  WeekDayDropdown,
} from '../../components';
import { useFilterStore } from '../../store/filterStore';
import { useSearchStore } from '../../store/searchStore';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherIcons';

type WeatherGridProps = {
  isLoading: boolean;
  weatherData: WeatherApiResponse;
};

export default function WeatherGrid({ isLoading, weatherData }: WeatherGridProps) {
  const { selectedDay } = useFilterStore();

  const { selectedLocation, searchResults, searchInput, hasSearched, isSearching } =
    useSearchStore();

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
    return <LoadingSkeleton />;
  }

  if (hasSearched && searchResults.length === 0 && !isSearching && !selectedLocation) {
    return (
      <div className="mt-12 flex justify-center">
        <h1 className="font-dm-sans text-dm-sans-preset-4 md:text-dm-sans-preset-3 text-white">
          No results found for "{searchInput}"
        </h1>
      </div>
    );
  }

  if (Object.keys(weatherData || {}).length === 0) {
    return null;
  }

  return (
    <motion.section
      animate={{
        opacity: [0, 1],
        transition: { duration: 0.3 },
      }}
      className="mt-8 grid grid-cols-3 gap-8 lg:mt-12"
    >
      <div className="col-span-full lg:col-span-2">
        <div className="flex h-[286px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[url(/assets/images/bg-today-small.svg)] bg-cover bg-center bg-no-repeat px-6 py-10 md:flex-row md:justify-between md:gap-0 md:bg-[url(/assets/images/bg-today-large.svg)] md:px-6 md:py-0">
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start">
            {selectedLocation ? (
              <h1 className="font-dm-sans text-dm-sans-preset-3 text-white">
                {selectedLocation?.name}, {selectedLocation?.country}
              </h1>
            ) : (
              <h1 className="font-dm-sans text-dm-sans-preset-3 text-center text-white">
                Today's Weather
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
        <CurrentWeatherCard
          title="Feels Like"
          currentTemperature={`${Math.round(weatherData?.current?.apparent_temperature ?? 0)}°`}
        />

        <CurrentWeatherCard
          title="Humidity"
          currentTemperature={`${weatherData?.current?.relative_humidity_2m ?? 0}%`}
        />

        <CurrentWeatherCard
          title="Wind"
          currentTemperature={`${Math.round(weatherData?.current?.wind_speed_10m ?? 0)}`}
          currentUnit={weatherData?.current_units?.wind_speed_10m?.replace('/', '')}
        />

        <CurrentWeatherCard
          title="Precipitation"
          currentTemperature={`${weatherData?.current?.precipitation ?? 0}`}
          currentUnit={weatherData?.current_units?.precipitation?.replace('inch', 'in')}
        />
      </div>
      <div className="col-span-full col-start-1 place-content-end lg:col-span-2">
        <h2 className="font-dm-sans text-dm-sans-preset-4 text-white">Daily forecast</h2>

        <div className="mt-5 grid grid-cols-3 gap-4 md:flex md:items-center">
          {dailyForecast.map((day: DailyForecast, index: number) => (
            <DailyForecastCard key={day.time} dailyData={day} i={index} />
          ))}
        </div>
      </div>

      <div className="bg-weather-800 col-span-full h-full rounded-[20px] px-4 py-5 md:p-6 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-dm-sans text-dm-sans-preset-4 text-white">Hourly forecast</h3>
          <WeekDayDropdown />
        </div>

        <div className="scrollbar-hide mt-4 flex h-[620px] flex-col gap-4 overflow-y-auto">
          {filteredHourlyForecast?.map((hour: HourlyForecast, index: number) => (
            <HourlyCard key={hour.time} hour={hour} i={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
