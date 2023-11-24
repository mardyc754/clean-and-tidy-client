import { useForm } from 'react-hook-form';

import {
  type FindReservationData,
  findReservationResolver
} from '~/schemas/forms/findReservation';

import { useReservation } from './useReservation';

export const useReservationFinder = (fieldName: keyof FindReservationData) => {
  const methods = useForm<FindReservationData>({
    resolver: findReservationResolver
  });

  const { handleSubmit, watch } = methods;

  const { data, status, error, refetch, isLoading } = useReservation(
    watch(fieldName),
    { enabled: false, retry: false }
  );

  const onSubmit = handleSubmit(async (_, e) => {
    e?.preventDefault();
    await refetch();
  });

  return { onSubmit, methods, data, status, error, isLoading };
};
