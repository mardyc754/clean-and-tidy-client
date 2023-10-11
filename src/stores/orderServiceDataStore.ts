import { create } from 'zustand';

import type { CleaningFrequencyKey } from '~/types/forms';

interface OrderServiceDataStoreState {
  numberOfUnits: number;
  unitName: string;
  totalCost: number;
  cleaningFrequency: CleaningFrequencyKey;
  totalDuration: number;
  startDate: Date | null;
  includeDetergents: boolean;
  increaseTotalCost: (cost: number) => void;
  increaseTotalDuration: (duration: number) => void;
  increaseTotalCostAndDuration: (cost: number, duration: number) => void;
  changeCleaningFrequency: (frequency: CleaningFrequencyKey) => void;
  changeStartDate: (date: Date) => void;
  changeIncludeDetergents: () => void;
}

const useOrderServiceDataStore = create<OrderServiceDataStoreState>((set) => ({
  numberOfUnits: 0,
  unitName: '',
  totalCost: 0,
  cleaningFrequency: 'once',
  totalDuration: 0,
  startDate: null,
  includeDetergents: false,
  // address: '',
  increaseTotalCost: (cost: number) =>
    set((state) => ({ totalCost: state.totalCost + cost })),
  increaseTotalDuration: (duration: number) =>
    set((state) => ({ totalDuration: state.totalDuration + duration })),
  increaseTotalCostAndDuration: (cost: number, duration: number) =>
    set((state) => ({
      totalDuration: state.totalDuration + duration,
      totalCost: state.totalCost + cost
    })),
  changeCleaningFrequency: (frequency: CleaningFrequencyKey) =>
    set({ cleaningFrequency: frequency }),
  changeStartDate: (date: Date) => set({ startDate: date }),
  changeIncludeDetergents: () =>
    set((state) => ({ includeDetergents: !state.includeDetergents }))
}));

export default useOrderServiceDataStore;
