import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getAllServices } from '~/api/services';
import type { AllServicesQueryOptions } from '~/api/types';

export function useServices(options?: AllServicesQueryOptions) {
  const { data: services, isLoading } = useQuery({
    queryKey: service.employeesWithFilters(options),
    queryFn: async () => await getAllServices(options)
  });

  return { services, isLoading };
}
