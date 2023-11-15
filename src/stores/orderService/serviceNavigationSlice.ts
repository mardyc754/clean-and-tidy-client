import { type StateCreator } from 'zustand';

export interface ServiceNavigationSlice {
  currentStep: number;
  increaseStep: () => void;
  decreaseStep: () => void;
}

export const createServiceNavigationSlice: StateCreator<
  ServiceNavigationSlice
> = (set) => ({
  currentStep: 0,
  increaseStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decreaseStep: () => set((state) => ({ currentStep: state.currentStep - 1 }))
});
