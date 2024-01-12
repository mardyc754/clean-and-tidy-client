import { type StateCreator } from 'zustand';

import type { Service } from '~/schemas/api/services';

import {
  type CleaningDetailsSlice,
  initialCleaningDetailsState
} from './cleaningDetailsSlice';

export interface ServiceNavigationSlice {
  currentServiceId: Service['id'] | null;
  initializeWithNewServiceId: (id: Service['id']) => void;
}

export const createServiceNavigationSlice: StateCreator<
  ServiceNavigationSlice & CleaningDetailsSlice,
  [],
  [],
  ServiceNavigationSlice
> = (set, get) => ({
  currentServiceId: null,
  initializeWithNewServiceId: (id) => {
    if (get().currentServiceId === id) return;

    set(() => ({
      currentServiceId: id,
      ...initialCleaningDetailsState
    }));
  }
});
