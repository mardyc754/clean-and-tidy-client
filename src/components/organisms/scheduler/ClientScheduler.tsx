import { useMemo } from 'react';

import type {
  EmployeeWithVisits,
  ReservationWithExtendedVisits
} from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';

import { IconIndicator } from '~/components/molecules/status-indicators';

import { daysBetween } from '~/utils/dateUtils';
import {
  generateIcsForClient,
  getEventsForClient,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';

import Scheduler, { type SchedulerProps, type VisitEvent } from './Scheduler';

export type EmployeeWithVisitEvents = Omit<EmployeeWithVisits, 'visitParts'> & {
  visits: VisitEvent[];
};

type AdminSchedulerProps = {
  reservationList: ReservationWithExtendedVisits[];
} & Omit<SchedulerProps, 'length' | 'events' | 'userRole'>;

const ClientScheduler = ({
  reservationList,
  ...props
}: AdminSchedulerProps) => {
  const { currentUser, isPending } = useAuth();

  const visits = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) =>
      getEventsForClient(reservation)
    );
  }, [reservationList]);

  const reservationsTimeslot = useMemo(() => {
    if (!visits) return;

    return daysBetween(getMaxEndDateFromReservationVisits(visits), new Date());
  }, [visits]);

  if (!currentUser && !isPending) {
    return (
      <IconIndicator variant="error" caption="Cannot load calendar data" />
    );
  }

  return (
    <Scheduler
      {...props}
      events={visits}
      length={reservationsTimeslot}
      onClickDownloadIcs={() =>
        generateIcsForClient(reservationList, currentUser!)
      }
      userRole="client"
    />
  );
};

export default ClientScheduler;
