import { type StateCreator } from 'zustand';

import type { Service } from '~/schemas/api/services';

import {
  type CleaningDetailsSlice,
  initialCleaningDetailsState
} from './cleaningDetailsSlice';

export interface ServiceNavigationSlice {
  currentStep: number;
  currentServiceId: Service['id'] | null;
  initializeWithNewServiceId: (id: Service['id']) => void;
  increaseStep: () => void;
  decreaseStep: () => void;
}

export const createServiceNavigationSlice: StateCreator<
  ServiceNavigationSlice & CleaningDetailsSlice,
  [],
  [],
  ServiceNavigationSlice
> = (set, get) => ({
  currentStep: 0,
  currentServiceId: null,
  initializeWithNewServiceId: (id) => {
    if (get().currentServiceId === id) return;

    set(() => ({
      currentServiceId: id,
      ...initialCleaningDetailsState
    }));
  },
  increaseStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decreaseStep: () => set((state) => ({ currentStep: state.currentStep - 1 }))
});
