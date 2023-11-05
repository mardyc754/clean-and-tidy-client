import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { getReservationByName } from '~/api/reservation';

import { reservation } from '~/constants/queryKeys';
import type { ReservationQueryOptions } from '~/api/types';

type CheckReservationData = { reservationName: string };

export const useReservationFinder = (
  fieldName: keyof CheckReservationData,
  options?: ReservationQueryOptions
) => {
  const methods = useForm<CheckReservationData>();

  const { handleSubmit, watch } = methods;

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [...reservation.detail(watch(fieldName), options)],
    queryFn: () => getReservationByName(watch(fieldName), options),
    enabled: false
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'bottom-center' });
      return;
    }
  }, [error]);

  const onSubmit = handleSubmit(async (_, e) => {
    e?.preventDefault();
    await refetch();
  });

  return { onSubmit, methods, data, isLoading };
};

export default useReservationFinder;
