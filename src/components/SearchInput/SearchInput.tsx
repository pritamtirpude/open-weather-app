import { useMutation } from '@tanstack/react-query';
import { motion } from 'motion/react';
import type React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchSearch } from '../../api';
import { SearchResults } from '../../components';
import { useSearchStore } from '../../store/searchStore';

export default function SearchInput() {
  const {
    searchInput,
    setSearchInput,
    setSearchResults,
    setIsSearching,
    setSelectedLocation,
    resetSearchState,
  } = useSearchStore();

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      setIsSearching(true);
      searchMutation.mutate(value.trim());
    } else {
      // Reset search state when input is empty
      resetSearchState();
    }
  }, 800);

  const searchMutation = useMutation({
    mutationFn: fetchSearch,
    onSuccess: (data) => {
      if (data?.results?.length > 0) {
        setSearchResults(data.results || []);
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setSelectedLocation(null);
        setIsSearching(false);
      }
    },
    onError: (error) => {
      console.error('Search error:', error);
      setIsSearching(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchInput.trim();
    if (searchValue) {
      setIsSearching(true);
      searchMutation.mutate(searchValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    handleSearch(value);
  };

  return (
    <div className="relative mt-12 md:w-full lg:mx-auto lg:mt-16 lg:w-[656px]">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center gap-3 md:flex-row md:gap-4"
      >
        <img
          className="absolute top-7 left-6 -translate-y-1/2 transform md:top-1/2"
          src="/assets/images/icon-search.svg"
          alt="Search icon"
        />
        <input
          id="search"
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          className="bg-weather-700 text-weather-200 focus:outline-weather-200 placeholder:text-weather-200 font-dm-sans w-full rounded-xl px-14 py-4 focus:outline-2 focus:outline-offset-2"
          type="text"
          placeholder="Search for a place..."
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={searchMutation.isPending}
          className="bg-weather-blue-500 focus:outline-weather-blue-700 hover:bg-weather-blue-700 font-dm-sans w-full cursor-pointer rounded-xl px-6 py-4 font-semibold text-white duration-150 focus:outline-2 focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          Search
        </motion.button>
      </form>

      <SearchResults isLoading={searchMutation.isPending} />
    </div>
  );
}
