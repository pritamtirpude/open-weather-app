export default function SearchInput() {
  return (
    <div className="mt-12 md:w-full lg:mx-auto lg:mt-16 lg:w-[656px]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex flex-col items-center gap-3 md:flex-row md:gap-4"
      >
        <img
          className="absolute top-7 left-6 -translate-y-1/2 transform md:top-1/2"
          src="/assets/images/icon-search.svg"
          alt="Search icon"
        />
        <input
          className="bg-weather-700 text-weather-200 focus:outline-weather-200 placeholder:text-weather-200 font-dm-sans w-full rounded-xl px-14 py-4 focus:outline-2 focus:outline-offset-2"
          type="text"
          placeholder="Search for a place..."
        />
        <button
          className="bg-weather-blue-500 focus:outline-weather-blue-700 hover:bg-weather-blue-700 font-dm-sans w-full cursor-pointer rounded-xl px-6 py-4 font-semibold text-white duration-150 focus:outline-2 focus:outline-offset-2 md:w-auto"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
