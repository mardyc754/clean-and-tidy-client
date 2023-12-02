import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  type CleaningDetailsSlice,
  createCleaningDetailsSlice,
  initialCleaningDetailsState
} from './cleaningDetailsSlice';
import {
  type ContactDetailsSlice,
  createContactDetailsSlice,
  initialContactDetailsState
} from './contactDetailsSlice';
import {
  type ServiceNavigationSlice,
  createServiceNavigationSlice
} from './serviceNavigationSlice';

type OrderServiceFormStoreState = CleaningDetailsSlice &
  ContactDetailsSlice &
  ServiceNavigationSlice & {
    resetOrderServiceForm: () => void;
  };

export const useOrderServiceFormStore = create<OrderServiceFormStoreState>()(
  devtools(
    persist(
      (set, ...actions) => ({
        ...createCleaningDetailsSlice(set, ...actions),
        ...createContactDetailsSlice(set, ...actions),
        ...createServiceNavigationSlice(set, ...actions),
        resetOrderServiceForm: () => {
          set({
            ...initialCleaningDetailsState,
            ...initialContactDetailsState
          });
        }
      }),
      { name: 'orderServiceFormStore' }
    ),
    { name: 'orderServiceFormStore' }
  )
);
