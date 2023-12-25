import { useQuery } from '@tanstack/react-query';

import { service } from '~/constants/queryKeys';

import { getAllServices } from '~/api/services';

export function useServices() {
  const { data: services, isLoading } = useQuery({
    queryKey: service.all,
    queryFn: () => getAllServices()
  });

  return { services, isLoading };
}
