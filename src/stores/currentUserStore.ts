import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ClientUser, EmployeeUser, User } from '~/schemas/api/auth';
import { Employee } from '~/schemas/api/employee';

import { UserRole } from '~/types/enums';

// interface CurrentUserStoreState {
//   userData: {
//     userId: number | null;
//     email: string | null;
//     role: UserRole | null;
//   };
//   setUserData: (data: Partial<CurrentUserStoreState['userData']>) => void;
// }

// export const useCurrentUserStore = create<CurrentUserStoreState>()(
//   devtools(
//     persist(
//       (set) => {
//         return {
//           userData: {
//             userId: null,
//             email: null,
//             role: null
//           },
//           setUserData: (data) =>
//             set((state) => ({ userData: { ...state.userData, ...data } }))
//         };
//       },
//       { name: 'current-user' }
//     )
//   )
// );

// const isClientUser = (user: User): user is ClientUser =>
// user.role === UserRole.CLIENT;

// const isEmployeeUser = (user: User): user is EmployeeUser =>
// user.role === UserRole.EMPLOYEE || user.role === UserRole.ADMIN;

const isClientUser = (user: User | null): user is ClientUser =>
  !!user && 'role' in user && user.role === UserRole.CLIENT;

const isEmployeeUser = (user: User | null): user is EmployeeUser =>
  !!user &&
  'role' in user &&
  [UserRole.EMPLOYEE, UserRole.ADMIN].includes(user.role);

interface CurrentUserStoreState {
  // role: UserRole | null;
  // clientData: Client | null;
  // employeeData: Employee | null;
  // setClientData: (data: Client) => void;
  // setEmployeeData: (data: Employee) => void;
  userData: User | null;
  isClient: () => ReturnType<typeof isClientUser>;
  isEmployee: () => ReturnType<typeof isEmployeeUser>;
  setUserData: (data: User | null) => void;
}

export const useCurrentUserStore = create<CurrentUserStoreState>()(
  devtools((set, get) => {
    return {
      userData: null,
      setUserData: (data) => set(() => ({ userData: data })),
      isClient: () => isClientUser(get().userData),
      isEmployee: () => isEmployeeUser(get().userData)
    };
  })
);
