import type { ReservationQueryOptions } from '~/api/types';

// example query key factory
//
// const todoKeys = {
//   all: ['todos'] as const,
//   lists: () => [...todoKeys.all, 'list'] as const,
//   list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
//   details: () => [...todoKeys.all, 'detail'] as const,
//   detail: (id: number) => [...todoKeys.details(), id] as const
// };

export const user = ['user'];

export const reservation = {
  all: ['reservations'] as const,
  find: () => [...reservation.all, 'find'] as const,
  lists: () => [...reservation.all, 'list'] as const,
  list: (filters: string) => [...reservation.lists(), { filters }] as const,
  details: () => [...reservation.all, 'detail'] as const,
  detail: (name: string, options?: ReservationQueryOptions) =>
    [...reservation.details(), name, options] as const
};
