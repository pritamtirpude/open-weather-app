import type { SearchResult } from '../..';
import { Spinner } from '../../components';
import { useSearchStore } from '../../store/searchStore';

type SearchResultsProps = {
  isLoading: boolean;
};

export default function SearchResults({ isLoading }: SearchResultsProps) {
  const { searchResults, isSearching, setSelectedLocation, setIsSearching, clearResults } =
    useSearchStore();

  const handleResultClick = (result: SearchResult) => {
    setSelectedLocation(result);
    setIsSearching(false);
    clearResults();
  };

  if (isLoading) {
    return (
      <div className="bg-weather-800 border-weather-700 absolute mt-3.5 flex h-auto w-full items-center gap-2.5 rounded-xl border p-2">
        <Spinner />
        <span className="text-dm-sans-preset-7 font-dm-sans text-white">Search in progress</span>
      </div>
    );
  }

  if (searchResults.length > 0 && !isSearching && !isLoading) {
    return (
      <div className="bg-weather-800 border-weather-700 absolute mt-3.5 h-auto w-full rounded-xl p-2">
        <ul className="flex flex-col gap-1">
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="hover:bg-weather-700 hover:outline-weather-600 cursor-pointer rounded-lg px-2 py-2.5 transition-all duration-150 hover:outline"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-dm-sans-preset-7 font-dm-sans text-white">{result.name}</span>
                <span className="font-dm-sans text-dm-sans-preset-8 text-weather-300">
                  {result.admin1}, {result.country}
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
