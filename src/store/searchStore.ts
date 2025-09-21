import { create } from 'zustand';
import type { SearchResult } from '..';

interface SearchStore {
  // Search results state
  searchResults: SearchResult[];
  // Selected location state
  selectedLocation: SearchResult | null;
  isSearching: boolean;
  hasSearched: boolean; // Track if a search was actually performed
  searchInput: string; // Add search input to store
  // Actions
  setSearchResults: (results: SearchResult[]) => void;
  setSelectedLocation: (location: SearchResult | null) => void;
  setIsSearching: (isSearching: boolean) => void;
  setHasSearched: (hasSearched: boolean) => void;
  setSearchInput: (input: string) => void;
  clearResults: () => void;
  clearSelectedLocation: () => void;
  resetSearchState: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  // Initial state
  searchResults: [],
  selectedLocation: null,
  isSearching: false,
  hasSearched: false,
  searchInput: '',

  // Actions
  setSearchResults: (results) =>
    set({
      searchResults: results,
      hasSearched: true, // Mark that a search was performed
    }),

  setSelectedLocation(location) {
    set({ selectedLocation: location });
  },

  setIsSearching: (isSearching: boolean) =>
    set({
      isSearching,
    }),

  setHasSearched: (hasSearched: boolean) =>
    set({
      hasSearched,
    }),

  setSearchInput: (input: string) =>
    set({
      searchInput: input,
    }),

  clearResults: () =>
    set({
      searchResults: [],
    }),

  clearSelectedLocation: () => set({ selectedLocation: null }),

  resetSearchState: () =>
    set({
      searchResults: [],
      isSearching: false,
      hasSearched: false,
      searchInput: '',
    }),
}));
