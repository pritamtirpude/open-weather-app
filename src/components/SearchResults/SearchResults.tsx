import { useLiveQuery } from 'dexie-react-hooks';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CircleFlag } from 'react-circle-flags';
import type { SearchResult } from '../..';
import { Spinner } from '../../components';
import useClickOutside from '../../hooks/useClickOutside';
import { useWeatherParams } from '../../hooks/useWeatherParams';
import type { FavoriteLocation } from '../../index';
import { db } from '../../indexeddb/db';
import { addToFavorites } from '../../indexeddb/helpers';
import { useSearchStore } from '../../store/searchStore';
import { cn } from '../../utils';

type SearchResultsProps = {
  isLoading: boolean;
};

export default function SearchResults({ isLoading }: SearchResultsProps) {
  const { searchResults, isSearching, setSelectedLocation, setIsSearching, clearResults } =
    useSearchStore();

  const { setParams } = useWeatherParams();

  const searchResultsRef = useClickOutside(() => clearResults()) as React.RefObject<HTMLDivElement>;

  // Keyboard navigation state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!searchResults.length) return;
    const lastIndex = searchResults.length - 1;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % searchResults.length;
        });
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setActiveIndex((prev) => {
          if (prev === null) return lastIndex;
          return (prev - 1 + searchResults.length) % searchResults.length;
        });
        break;
      }
      case 'Home': {
        e.preventDefault();
        setActiveIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setActiveIndex(lastIndex);
        break;
      }
      case 'Enter': {
        if (activeIndex !== null) {
          e.preventDefault();
          const result = searchResults[activeIndex];
          if (result) handleResultClick(result);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        setActiveIndex(null);
        break;
      }
      default:
        break;
    }
  };

  // Ensure refs array length matches results length
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, searchResults.length);
    // Reset activeIndex when results change or search panel hides
    if (!isSearching) {
      setActiveIndex(null);
    }
  }, [searchResults.length, isSearching]);

  // Scroll the active item into view when it changes
  useEffect(() => {
    if (activeIndex !== null) {
      const node = itemRefs.current[activeIndex];
      node?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

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
      <motion.div
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        role="listbox"
        key="search-results"
        aria-activedescendant={
          activeIndex !== null && itemRefs.current[activeIndex]
            ? `search-option-${searchResults[activeIndex]?.id}`
            : undefined
        }
        tabIndex={0}
        ref={searchResultsRef}
        className="bg-weather-800 scrollbar-hide border-weather-700 absolute top-12 z-40 mt-3.5 h-60 w-full overflow-y-auto rounded-xl p-2"
      >
        <ul ref={listRef} className="flex flex-col gap-1">
          {searchResults.map((result, idx) => {
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

            const isActive = idx === activeIndex;
            return (
              <li
                key={result?.id}
                id={`search-option-${result?.id}`}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isActive}
                onClick={() => handleResultClick(result)}
                className={cn(
                  'hover:bg-weather-700 hover:outline-weather-600 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-all duration-150 hover:outline',
                  isActive ? 'bg-weather-600 outline-weather-600 outline' : '',
                )}
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
      </motion.div>
    );
  }

  return null;
}
