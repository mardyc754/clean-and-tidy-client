import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import {
  findReservationResolver,
  type FindReservationData
} from '~/schemas/forms/findReservation';

import { getReservationByName } from '~/api/reservation';
import type { ReservationQueryOptions } from '~/api/types';

import { reservation } from '~/constants/queryKeys';

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
