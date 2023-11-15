import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  type CleaningDetailsSlice,
  createCleaningDetailsSlice
} from './cleaningDetailsSlice';
import {
  type ContactDetailsSlice,
  createContactDetailsSlice
} from './contactDetailsSlice';
import {
  type ServiceNavigationSlice,
  createServiceNavigationSlice
} from './serviceNavigationSlice';

type OrderServiceFormStoreState = CleaningDetailsSlice &
  ContactDetailsSlice &
  ServiceNavigationSlice;

export const useOrderServiceFormStore = create<OrderServiceFormStoreState>()(
  devtools(
    (...actions) => ({
      ...createCleaningDetailsSlice(...actions),
      ...createContactDetailsSlice(...actions),
      ...createServiceNavigationSlice(...actions)
    }),
    { name: 'orderServiceFormStore' }
  )
);
