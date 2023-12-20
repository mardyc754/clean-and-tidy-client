import { useQuery } from '@tanstack/react-query';

import { reservation } from '~/constants/queryKeys';

import { getReservationByName } from '~/api/reservation';

export const useReservation = (
  name: string,
  options?: Partial<{ retry: boolean; enabled: boolean }>
) => {
  const { data, status, error, refetch, isLoading } = useQuery({
    queryKey: reservation.byName(name),
    queryFn: () => getReservationByName(name),
    ...options
  });

  return { refetch, data, status, error, isLoading };
};
