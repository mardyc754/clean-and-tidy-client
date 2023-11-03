import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import type { UserRole } from '~/types/enums';

interface CurrentUserStoreState {
  userId: number | null;
  email: string | null;
  role: UserRole | null;
  setUserId: (userId: number | null) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: UserRole | null) => void;
  setUserData: (
    data: Partial<Pick<CurrentUserStoreState, 'userId' | 'email' | 'role'>>
  ) => void;
}

export const useCurrentUserStore = create<CurrentUserStoreState>()(
  devtools(
    persist(
      (set) => {
        return {
          userId: null,
          email: null,
          role: null,
          setUserId: (userId) => set({ userId }),
          setEmail: (email) => set({ email }),
          setRole: (role) => set({ role }),
          setUserData: (data) => set({ ...data })
        };
      },
      { name: 'current-user' }
    )
  )
);
