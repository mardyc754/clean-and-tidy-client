import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { reservation } from '~/constants/queryKeys';

import { getReservationByName } from '~/api/reservation';
import type { ReservationQueryOptions } from '~/api/types';

import {
  type FindReservationData,
  findReservationResolver
} from '~/schemas/forms/findReservation';

export const useReservationFinder = (
  fieldName: keyof FindReservationData,
  options?: ReservationQueryOptions
) => {
  const methods = useForm<FindReservationData>({
    resolver: findReservationResolver
  });

  const { handleSubmit, watch } = methods;

  const { data, status, error, refetch, isLoading } = useQuery({
    queryKey: [...reservation.find(), fieldName, options],
    queryFn: () => getReservationByName(watch(fieldName), options),
    enabled: false,
    retry: false
  });

  const onSubmit = handleSubmit(async (_, e) => {
    e?.preventDefault();
    await refetch();
  });

  return { onSubmit, methods, data, status, error, isLoading };
};

export default useReservationFinder;
