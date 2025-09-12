export default function WeatherGrid() {
  return (
    <section className="mt-8 grid grid-cols-3 gap-8 lg:mt-12">
      <div className="col-span-full lg:col-span-2">
        <div className="flex h-[286px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[url(/assets/images/bg-today-small.svg)] bg-cover bg-center bg-no-repeat px-6 py-10 md:flex-row md:justify-between md:gap-0 md:bg-[url(/assets/images/bg-today-large.svg)] md:px-6 md:py-0">
          <div>
            <h1 className="font-dm-sans text-dm-sans-preset-3 text-white">Berlin, Germany</h1>
            <span className="font-dm-sans text-dm-sans-preset-6 text-white/80">
              Tuesday, Aug, 2025
            </span>
          </div>
          <div className="flex w-[294px] items-center gap-5">
            <img
              src="/assets/images/icon-sunny.webp"
              className="size-[120px]"
              alt="location icon"
            />
            <span className="font-dm-sans text-dm-sans-preset-1 text-white italic">20°</span>
          </div>
        </div>
      </div>
      <div className="col-span-full grid size-full grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-2">
        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Feels Like</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">64°</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Humidity</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">46%</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Wind</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">9 mph</span>
        </div>

        <div className="bg-weather-800 border-weather-600 flex flex-col gap-y-3 rounded-xl border p-5">
          <h2 className="font-dm-sans text-weather-200 text-dm-sans-preset-6">Precipitation</h2>
          <span className="font-dm-sans text-dm-sans-preset-2 text-white">0 in</span>
        </div>
      </div>
      <div className="col-span-full col-start-1 lg:col-span-2 lg:mt-12">
        <h2 className="font-dm-sans text-dm-sans-preset-4 text-white">Daily forecast</h2>

        <div className="mt-5 grid grid-cols-3 gap-4 md:flex md:items-center">
          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>

          <div className="bg-weather-800 border-weather-600 flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2.5 py-4">
            <h3 className="font-dm-sans text-dm-sans-preset-6 text-white">Tue</h3>
            <img className="size-[60px]" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">68°</span>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">57°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-weather-800 col-span-full size-full rounded-[20px] px-4 py-5 md:p-6 lg:col-start-3 lg:row-span-3 lg:row-start-1">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-dm-sans text-dm-sans-preset-4 text-white">Hourly forecast</h3>
          <div>
            <h4 className="font-dm-sans text-dm-sans-preset-5 text-white">Tuesday</h4>
          </div>
        </div>

        <div className="mt-4 flex size-full flex-col gap-4 overflow-auto">
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-600 flex items-center justify-between rounded-lg border px-3 py-2.5">
            <div className="flex items-center gap-2">
              <img className="size-10" src="/assets/images/icon-rain.webp" alt="icon rain" />
              <span className="font-dm-sans text-dm-sans-preset-5 text-white">3 PM</span>
            </div>

            <div>
              <span className="font-dm-sans text-dm-sans-preset-7 text-white">20°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
