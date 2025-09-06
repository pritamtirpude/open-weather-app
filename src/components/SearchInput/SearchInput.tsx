export default function SearchInput() {
  return (
    <div className="mx-auto mt-12 w-xl">
      <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center gap-x-4">
        <img
          className="absolute top-1/2 left-4 -translate-y-1/2 transform"
          src="/assets/images/icon-search.svg"
          alt="Search icon"
        />
        <input
          className="bg-weather-700 text-weather-200 focus:outline-weather-200 placeholder:text-weather-200 font-dm-sans w-full rounded-2xl px-12 py-3.5 focus:outline-2 focus:outline-offset-2"
          type="text"
          placeholder="Search for a place..."
        />
        <button
          className="bg-weather-blue-500 focus:outline-weather-blue-700 text-weather-200 font-dm-sans cursor-pointer rounded-lg px-6 py-3 font-semibold focus:outline-2 focus:outline-offset-2"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
