import { format } from 'date-fns';
import { motion } from 'motion/react';
import type { DailyForecast } from '../..';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherIcons';

type DailyForecastCardProps = {
  dailyData: DailyForecast;
  i: number;
};

export default function DailyForecastCard({ dailyData, i }: DailyForecastCardProps) {
  return (
    <motion.div
      initial={{ x: -12, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: i * 0.1,
        },
      }}
      className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4"
    >
      <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">
        {format(new Date(dailyData.time), 'EEE')}
      </h3>
      <img
        className="size-[60px]"
        src={getWeatherIcon(dailyData.weather_code)}
        alt={getWeatherDescription(dailyData.weather_code)}
      />

      <div className="flex size-full items-center justify-between">
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">
          {Math.round(dailyData.temperature_2m_max)}°
        </span>
        <span className="font-dm-sans text-dm-sans-preset-7 text-white">
          {Math.round(dailyData.temperature_2m_min)}°
        </span>
      </div>
    </motion.div>
  );
}
