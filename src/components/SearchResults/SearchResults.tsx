import { CircleFlag } from 'react-circle-flags';
import type { SearchResult } from '../..';
import { Spinner } from '../../components';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import { useSearchStore } from '../../store/searchStore';

type SearchResultsProps = {
  isLoading: boolean;
};

export default function SearchResults({ isLoading }: SearchResultsProps) {
  const { searchResults, isSearching, setSelectedLocation, setIsSearching, clearResults } =
    useSearchStore();

  const { setParams } = useWeatherParams();

  const handleResultClick = (result: SearchResult) => {
    setSelectedLocation(result);
    setParams({
      latitude: result?.latitude.toString(),
      longitude: result?.longitude.toString(),
      timezone: result?.timezone,
    });
    setIsSearching(false);
    clearResults();
  };

  if (isLoading) {
    return (
      <div className="bg-weather-800 border-weather-700 absolute top-[65px] flex h-auto w-full items-center gap-2.5 rounded-xl border px-2 py-4">
        <Spinner />
        <span className="text-dm-sans-preset-7 font-dm-sans text-white">Search in progress</span>
      </div>
    );
  }

  if (searchResults.length > 0 && !isSearching && !isLoading) {
    return (
      <div className="bg-weather-800 scrollbar-hide border-weather-700 absolute top-12 mt-3.5 h-60 w-full overflow-y-auto rounded-xl p-2">
        <ul className="flex flex-col gap-1">
          {searchResults.map((result) => (
            <li
              key={result?.id}
              onClick={() => handleResultClick(result)}
              className="hover:bg-weather-700 hover:outline-weather-600 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition-all duration-150 hover:outline"
            >
              <CircleFlag
                countryCode={result?.country_code.toLowerCase() || 'us'}
                className="size-10"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-dm-sans-preset-7 font-dm-sans text-white">
                  {result?.name}
                </span>
                <span className="font-dm-sans text-dm-sans-preset-8 text-weather-300">
                  {result?.admin1}, {result?.country}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
