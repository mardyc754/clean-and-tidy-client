import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { reservation, visit } from '~/constants/queryKeys';

import { getEmployeeReservations, getEmployeeVisits } from '~/api/employee';

import { getEventsFromVisits } from '~/utils/scheduler';

import { Status } from '~/types/enums';

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
    queryFn: () =>
      getEmployeeReservations(employeeId, { status: Status.TO_BE_CONFIRMED })
  });

  const visitEvents = useMemo(
    () => getEventsFromVisits(visitList?.map(({ visit }) => visit) ?? []),
    [visitList]
  );

  return {
    visitList,
    reservationList,
    visitEvents,
    isLoading
  };
}
