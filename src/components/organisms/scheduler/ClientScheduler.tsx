import { useMemo } from 'react';

import type {
  EmployeeWithVisits,
  ReservationWithExtendedVisits
} from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';

import { IconIndicator } from '~/components/molecules/status-indicators';

import { daysBetween } from '~/utils/dateUtils';
import {
  generateIcsFromReservationList,
  getEventsFromReservation,
  getMaxEndDateFromReservationVisits
} from '~/utils/scheduler';

import Scheduler, { type SchedulerProps, type VisitEvent } from './Scheduler';

export type EmployeeWithVisitEvents = Omit<EmployeeWithVisits, 'visitParts'> & {
  visits: VisitEvent[];
};

type AdminSchedulerProps = {
  reservationList: ReservationWithExtendedVisits[];
} & Omit<SchedulerProps, 'length' | 'events'>;

const ClientScheduler = ({
  reservationList,
  ...props
}: AdminSchedulerProps) => {
  const { currentUser, isPending } = useAuth();

  const visits = useMemo(() => {
    if (!reservationList) return [];

    return reservationList.flatMap((reservation) =>
      getEventsFromReservation(reservation)
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
        generateIcsFromReservationList(reservationList, currentUser!)
      }
    />
  );
};

export default ClientScheduler;
