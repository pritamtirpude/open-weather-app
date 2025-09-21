export default function LoadingSkeleton() {
  return (
    <section className="mt-8 grid animate-pulse grid-cols-3 gap-8 lg:mt-12">
      <div className="col-span-full lg:col-span-2">
        <div className="bg-weather-800 flex h-[286px] flex-col items-center justify-center gap-4 rounded-[20px] bg-cover bg-center bg-no-repeat px-6 py-10 md:flex-row md:justify-between md:gap-0 md:px-6 md:py-0"></div>
      </div>

      <div className="col-span-full grid size-full grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-2">
        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Feels Like</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">-</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Humidity</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">-</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Wind</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">-</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Precipitation</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">-</span>
        </div>
      </div>

      <div className="col-span-full col-start-1 lg:col-span-2">
        <h2 className="font-dm-sans text-dm-sans-preset-4 text-white">Daily forecast</h2>

        <div className="mt-5 grid grid-cols-3 gap-4 md:flex md:items-center">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              className="bg-weather-800 border-weather-600 flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4"
              key={index}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-weather-800 col-span-full h-full rounded-[20px] px-4 py-5 md:p-6 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-dm-sans text-dm-sans-preset-4 text-white">Hourly forecast</h3>
          <div className="bg-weather-600 relative cursor-pointer rounded-lg px-4 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-white">
            <div className="flex items-center gap-3">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">-</span>
              <img src="/assets/images/icon-dropdown.svg" alt="icon dropdown" />
            </div>
          </div>
        </div>

        <div className="scrollbar-hide mt-4 flex flex-col gap-4 overflow-y-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-weather-700 border-weather-600 flex h-14 items-center justify-between rounded-lg border px-3 py-2.5"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
