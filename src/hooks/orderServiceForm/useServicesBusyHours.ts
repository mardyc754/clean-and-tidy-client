import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getServicesBusyHours } from '~/api/services';
import type { ServiceBusyHoursQueryOptions } from '~/api/types';

// TODO: Maybe it can be connected with the useCleaningDetailsForm hook?
export function useServicesBusyHours(options: ServiceBusyHoursQueryOptions) {
  const { data: servicesWithBusyHours, isSuccess } = useQuery({
    queryKey: service.workingHours(options),
    queryFn: () => getServicesBusyHours(options)
  });

  return { servicesWithBusyHours, isSuccess };
}
