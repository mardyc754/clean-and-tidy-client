import { useQuery } from '@tanstack/react-query';

import { reservation } from '~/constants/queryKeys';

import { getReservationByName } from '~/api/reservation';

export const useReservation = (
  name: string,
  options?: { retry: boolean; enabled: boolean }
) => {
  const { data, status, error, refetch, isLoading } = useQuery({
    queryKey: [
      ...reservation.find(),
      name,
      {
        includeVisits: true,
        includeServices: true,
        includeAddress: true
      }
    ],
    queryFn: () => getReservationByName(name),
    ...options
  });

  return { refetch, data, status, error, isLoading };
};
