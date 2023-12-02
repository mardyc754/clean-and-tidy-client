import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getServicesBusyHours } from '~/api/services';
import type { ServiceBusyHoursQueryOptions } from '~/api/types';

import { nextDayTimeSlot } from '~/utils/dateUtils';

// TODO: Maybe it can be connected with the useCleaningDetailsForm hook?
export function useServicesBusyHours(options: ServiceBusyHoursQueryOptions) {
  const newTimeSlot =
    options?.from !== undefined && options?.to !== undefined
      ? { from: options.from, to: options.to }
      : nextDayTimeSlot();
  const newOptions = { ...options, ...newTimeSlot };

  const { data: busyHoursData, isSuccess } = useQuery({
    queryKey: service.workingHours(newOptions),
    queryFn: () => getServicesBusyHours(newOptions)
    // enabled: options?.from !== undefined || options?.to !== undefined
  });

  return { busyHoursData, isSuccess };
}
