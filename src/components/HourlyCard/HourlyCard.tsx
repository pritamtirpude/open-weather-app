import { format } from 'date-fns';
import type { HourlyForecast } from '../..';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherIcons';

type HourlyCardProps = {
  hour: HourlyForecast;
};

export default function HourlyCard({ hour }: HourlyCardProps) {
  return (
    <div
      key={hour.time}
      className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5"
    >
      <div className="flex items-center gap-2">
        <img
          className="size-10"
          src={getWeatherIcon(hour?.weather_code)}
          alt={getWeatherDescription(hour?.weather_code)}
        />
        <span className="font-dm-sans text-dm-sans-preset-5 text-white">
          {format(hour?.time, 'h a')}
        </span>
      </div>

      <div>
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">
          {Math.round(hour?.temperature_2m)}°
        </span>
      </div>
    </div>
  );
}
