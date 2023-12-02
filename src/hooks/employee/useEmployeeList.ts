import { useQuery } from '@tanstack/react-query';

import { employee } from '~/constants/queryKeys';

import { getAllEmployees, getAllEmployeesWithVisits } from '~/api/employee';

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

export function useEmployeeListWithVisits() {
  const { data: employeeList, isLoading } = useQuery({
    queryKey: employee.filters({ includeVisits: true }),
    queryFn: () => getAllEmployeesWithVisits()
  });

  return {
    employeeList,
    isLoading
  };
}
