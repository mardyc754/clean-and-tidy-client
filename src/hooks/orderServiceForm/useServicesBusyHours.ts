import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getServicesBusyHours } from '~/api/services';
import type { ServiceBusyHoursQueryOptions } from '~/api/types';

// TODO: Maybe it can be connected with the useCleaningDetailsForm hook?
export function useServicesBusyHours(options: ServiceBusyHoursQueryOptions) {
  const { data: busyHoursData, isSuccess } = useQuery({
    queryKey: service.workingHours(options),
    queryFn: () => getServicesBusyHours(options)
    // enabled: options?.from !== undefined || options?.to !== undefined
  });

  return { busyHoursData, isSuccess };
}
