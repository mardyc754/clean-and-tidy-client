import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getAllServices, getAllServicesWithEmployees } from '~/api/services';
import type { AllServicesQueryOptions } from '~/api/types';

export function useServices(options?: AllServicesQueryOptions) {
  const { data: services, isLoading } = useQuery({
    queryKey: service.employeesWithFilters(options),
    queryFn: () => getAllServices(options)
  });

  return { services, isLoading };
}

export function useServicesWithEmployees() {
  const { data: services, isLoading } = useQuery({
    queryKey: service.employeesWithFilters({ includeEmployee: true }),
    queryFn: getAllServicesWithEmployees
  });

  return { services, isLoading };
}
