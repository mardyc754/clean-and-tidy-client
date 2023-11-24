import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { reservation } from '~/constants/queryKeys';

import { getReservationByName } from '~/api/reservation';

import {
  type FindReservationData,
  findReservationResolver
} from '~/schemas/forms/findReservation';

export const useReservation = (
  name: string,
  options?: { retry: boolean; enabled: boolean }
) => {
  const methods = useForm<FindReservationData>({
    resolver: findReservationResolver
  });

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

  return { refetch, methods, data, status, error, isLoading };
};
