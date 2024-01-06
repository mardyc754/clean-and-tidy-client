import * as React from 'react';

import { frequencyToDescriptionMap } from '~/constants/mappings';

import type { ReservationWithVisits } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import { StatusIndicator } from '~/components/atoms/typography';

import {
  displayDateWithHours,
  getClosestDateFromNow,
  isAfter
} from '~/utils/dateUtils';
import {
  getMainServiceForReservation,
  getReservationEndDate,
  getReservationStatus
} from '~/utils/reservationUtils';
import { getVisitStartEndDates } from '~/utils/visitUtils';

import { Status } from '~/types/enums';

import DataTable from './DataTable';

function createReservationRows(data: ReservationWithVisits[]) {
  const statusWeightMap = new Map([
    [Status.ACTIVE, 0],
    [Status.TO_BE_CONFIRMED, 0],
    [Status.CANCELLED, 2],
    [Status.CLOSED, 3]
  ]);

  const rows = data.map((reservation) => {
    return {
      id: reservation.id,
      mainServiceName: getMainServiceForReservation(reservation)?.name,
      frequencyName: frequencyToDescriptionMap.get(reservation.frequency),
      firstVisitDate: displayDateWithHours(
        getVisitStartEndDates(reservation.visits[0]!).startDate
      ),
      upcomingVisitDate: getClosestDateFromNow(
        reservation.visits?.flatMap((visit) => visit?.visitParts[0]?.startDate)
      ),
      status: getReservationStatus(reservation),
      action: (
        <Button
          href={`/reservations/${reservation.name}`}
          disabled={isAfter(new Date(), getReservationEndDate(reservation))}
        >
          Manage
        </Button>
      )
    };
  });

  rows.sort((a, b) => {
    const firstUpcomingVisitDate = a.upcomingVisitDate
      ? new Date(a.upcomingVisitDate).getTime()
      : Infinity;
    const secondUpcomingVisitDate = b.upcomingVisitDate
      ? new Date(b.upcomingVisitDate).getTime()
      : Infinity;

    return (
      (statusWeightMap.get(a.status) ?? -Infinity) -
        (statusWeightMap.get(b.status) ?? -Infinity) ||
      firstUpcomingVisitDate - secondUpcomingVisitDate
    );
  });

  return rows.map((row) => ({
    ...row,
    upcomingVisitDate: row.upcomingVisitDate
      ? displayDateWithHours(row.upcomingVisitDate)
      : 'No upcoming visit',
    status: <StatusIndicator perspective="client" status={row.status} />
  }));
}

interface ReservationTableProps {
  data: ReservationWithVisits[];
}

const ReservationTable = ({ data }: ReservationTableProps) => {
  const columns = [
    'Id',
    'Reservation name',
    'Frequency',
    'First visit date',
    'Upcoming visit date',
    'Status',
    'Actions'
  ];

  return (
    <DataTable
      name="reservationTable"
      columns={columns}
      rows={createReservationRows(data)}
    />
  );
};

export default ReservationTable;
