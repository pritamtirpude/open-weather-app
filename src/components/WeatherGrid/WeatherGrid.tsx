export default function WeatherGrid() {
  return (
    <section className="mt-6 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="flex size-full items-center justify-between bg-[url(/assets/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat px-6 py-20">
          <div>
            <h1 className="font-dm-sans text-weather-200 text-3xl font-bold">Berlin, Germany</h1>
            <span className="font-dm-sans text-weather-300 text-base">Tuesday, Aug, 2025</span>
          </div>
          <div className="flex items-center">
            <img
              src="/assets/images/icon-sunny.webp"
              className="size-28 object-cover"
              alt="location icon"
            />
            <span className="font-dm-sans text-weather-200 text-8xl font-semibold italic">68°</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 grid size-full grid-cols-4 gap-6">
        <div className="bg-weather-700 border-weather-300/15 flex flex-col gap-y-3 rounded-2xl border p-6">
          <h2 className="font-dm-sans text-weather-200 text-base">Feels Like</h2>
          <span className="font-dm-sans text-weather-200 text-3xl">64°</span>
        </div>

        <div className="bg-weather-700 border-weather-300/15 flex flex-col gap-y-3 rounded-2xl border p-6">
          <h2 className="font-dm-sans text-weather-200 text-base">Humidity</h2>
          <span className="font-dm-sans text-weather-200 text-3xl">46%</span>
        </div>

        <div className="bg-weather-700 border-weather-300/15 flex flex-col gap-y-3 rounded-2xl border p-6">
          <h2 className="font-dm-sans text-weather-200 text-base">Wind</h2>
          <span className="font-dm-sans text-weather-200 text-3xl">9 mph</span>
        </div>

        <div className="bg-weather-700 border-weather-300/15 flex flex-col gap-y-3 rounded-2xl border p-6">
          <h2 className="font-dm-sans text-weather-200 text-base">Precipitation</h2>
          <span className="font-dm-sans text-weather-200 text-3xl">0 in</span>
        </div>
      </div>
      <div className="col-span-2 col-start-1">
        <h2 className="text-weather-200 font-dm-sans text-xl font-bold">Daily forecast</h2>

        <div className="mt-6 flex items-center gap-4">
          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>

          <div className="bg-weather-700 border-weather-300/15 flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4">
            <h3 className="font-dm-sans text-weather-200 text-base">Tue</h3>
            <img className="size-14" src="/assets/images/icon-rain.webp" alt="icon rain" />

            <div className="flex size-full items-center justify-between">
              <span className="text-weather-200 font-dm-sans text-base font-bold">68°</span>
              <span className="text-weather-200 font-dm-sans text-base">57°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-start-3 row-start-1">
        <h3 className="text-lg text-white">Hourly</h3>
      </div>
    </section>
  );
}
