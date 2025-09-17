import { format } from 'date-fns';
import { create } from 'zustand';

type FilterStoreState = {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
};

export const useFilterStore = create<FilterStoreState>((set) => ({
  selectedDay: format(new Date(), 'EEEE'),
  setSelectedDay: (day: string) => set({ selectedDay: day }),
}));
