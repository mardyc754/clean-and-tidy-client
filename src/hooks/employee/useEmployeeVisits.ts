import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { reservation, visit } from '~/constants/queryKeys';

import { getEmployeeReservations, getEmployeeVisits } from '~/api/employee';

import { getEventsForEmployee } from '~/utils/scheduler';

type useEmployeeVisitsOptions = {
  employeeId: number;
};

export function useEmployeeVisits({ employeeId }: useEmployeeVisitsOptions) {
  const { data: visitList, isLoading } = useQuery({
    queryKey: visit.employee(employeeId),
    queryFn: () => getEmployeeVisits(employeeId)
  });

  const { data: reservationList } = useQuery({
    queryKey: reservation.employee(employeeId),
    queryFn: () => getEmployeeReservations(employeeId)
  });

  const visitEvents = useMemo(
    () => getEventsForEmployee(visitList ?? []),
    [visitList]
  );

  return {
    visitList,
    reservationList,
    visitEvents,
    isLoading
  };
}
