import { useQuery } from '@tanstack/react-query';

import { employee } from '~/constants/queryKeys';

import { getEmployeesBusyHours } from '~/api/employee';
import type { EmployeeBusyHoursQueryOptions } from '~/api/types';

export function useEmployeesBusyHours(options: EmployeeBusyHoursQueryOptions) {
  const { data: busyHoursData, isSuccess } = useQuery({
    queryKey: employee.workingHours(options),
    queryFn: () => getEmployeesBusyHours(options)
    // enabled: options?.from !== undefined || options?.to !== undefined
  });

  return { busyHoursData, isSuccess };
}
