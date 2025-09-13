import { create } from 'zustand';
import type { SearchResult } from '..';

interface SearchStore {
  // Search results state
  searchResults: SearchResult[];
  // Selected location state
  selectedLocation: SearchResult | null;
  isSearching: boolean;
  // Actions
  setSearchResults: (results: SearchResult[]) => void;
  setSelectedLocation: (location: SearchResult) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearResults: () => void;
  clearSelectedLocation: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  // Initial state
  searchResults: [],
  selectedLocation: null,
  isSearching: false,

  // Actions
  setSearchResults: (results) =>
    set({
      searchResults: results,
    }),

  setSelectedLocation(location) {
    set({ selectedLocation: location });
  },

  setIsSearching: (isSearching: boolean) =>
    set({
      isSearching,
    }),

  clearResults: () =>
    set({
      searchResults: [],
    }),

  clearSelectedLocation: () => set({ selectedLocation: null }),
}));
