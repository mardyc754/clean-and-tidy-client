import { useQuery } from '@tanstack/react-query';

import { employee } from '~/constants/queryKeys';

import { getAllEmployees } from '~/api/employee';

export function useEmployeeList() {
  const { data: employeeList, isLoading } = useQuery({
    queryKey: employee.all,
    queryFn: getAllEmployees
  });

  return {
    employeeList,
    isLoading
  };
}
