import { QueryClient, dehydrate } from '@tanstack/react-query';

import { employee } from '~/constants/queryKeys';

import { getEmployeeWithServices } from '~/api/employee';

import type { Employee, EmployeeWithServices } from '~/schemas/api/employee';

export const fetchEmployeeData = async (employeeId: string) => {
  const queryClient = new QueryClient();

  if (!employeeId || isNaN(parseInt(employeeId))) {
    return {
      dehydratedState: dehydrate(queryClient),
      employeeData: undefined
    };
  }

  let employeeData: EmployeeWithServices | undefined;

  try {
    employeeData = await queryClient.fetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: employee.findServices(parseInt(employeeId)),
      queryFn: async () => {
        const res = await getEmployeeWithServices(employeeId);

        return res;
      }
    });
  } catch (error) {
    console.error(error);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    employeeData
  };
};
