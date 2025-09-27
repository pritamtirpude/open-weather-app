import { useLiveQuery } from 'dexie-react-hooks';
import { Star } from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';
import type { SearchResult } from '../..';
import { Spinner } from '../../components';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import type { FavoriteLocation } from '../../index';
import { db } from '../../indexeddb/db';
import { addToFavorites } from '../../indexeddb/helpers';
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

  // Live query favorites from IndexedDB and build a Set of favorite IDs
  const favorites = useLiveQuery<FavoriteLocation[]>(() => db.favorites.toArray(), []);
  const favoriteIds = new Set((favorites ?? []).map((f) => f.id));

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
          {searchResults.map((result) => {
            if (!result) return null;

            const favoriteLocation = {
              id: result.id,
              name: result.name,
              latitude: result.latitude,
              longitude: result.longitude,
              country: result.country,
              country_code: result.country_code,
              admin1: result.admin1,
              timezone: result.timezone,
            };

            const isFavorited = favoriteIds.has(result.id);

            return (
              <li
                key={result?.id}
                onClick={() => handleResultClick(result)}
                className="hover:bg-weather-700 hover:outline-weather-600 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-all duration-150 hover:outline"
              >
                <div className="flex items-center gap-2.5">
                  <CircleFlag
                    countryCode={result?.country_code?.toLowerCase() || 'us'}
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
                </div>
                {!isFavorited && (
                  <div
                    className="hover:bg-weather-800 rounded-lg p-2 transition-all duration-150"
                    title="Add to favorites"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Star className="text-white" onClick={() => addToFavorites(favoriteLocation)} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}
