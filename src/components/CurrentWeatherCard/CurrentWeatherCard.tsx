type CurrentWeatherCardProps = {
  title: string;
  currentTemperature: string;
  currentUnit?: string;
};

export default function CurrentWeatherCard({
  title,
  currentTemperature,
  currentUnit,
}: CurrentWeatherCardProps) {
  return (
    <div className="bg-weather-800 border-weather-600 flex flex-col justify-between gap-y-3 rounded-xl border p-5">
      <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">{title}</h2>
      <span className="font-dm-sans text-dm-sans-preset-2 text-white">
        {currentTemperature}
        &nbsp;
        {currentUnit && currentUnit}
      </span>
    </div>
  );
}
