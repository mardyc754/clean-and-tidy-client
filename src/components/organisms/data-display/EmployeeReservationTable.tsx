import * as React from 'react';

import { frequencyToDescriptionMap } from '~/constants/mappings';

import type { EmployeeReservation } from '~/schemas/api/reservation';

import { StatusIndicator } from '~/components/atoms/typography';

import { displayDateWithHours, getClosestDateFromNow } from '~/utils/dateUtils';
import { getMainServiceForReservation } from '~/utils/reservationUtils';
import { getVisitStartEndDates } from '~/utils/visitUtils';

import { Status } from '~/types/enums';

import { ReservationDetailsButton } from '../dialogs';
import DataTable from './DataTable';

function createReservationRows(data: EmployeeReservation[]) {
  const statusWeightMap = new Map([
    [Status.TO_BE_CONFIRMED, 0],
    [Status.ACTIVE, 1],
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
      status: reservation.status,
      action: <ReservationDetailsButton reservationName={reservation.name} />
    };
  });

  rows.sort((a, b) => {
    return (
      (statusWeightMap.get(a.status) ?? -Infinity) -
        (statusWeightMap.get(b.status) ?? -Infinity) ||
      new Date(a.upcomingVisitDate ?? 0).getTime() -
        new Date(b.upcomingVisitDate ?? 0).getTime()
    );
  });

  return rows.map((row) => ({
    ...row,
    upcomingVisitDate: row.upcomingVisitDate
      ? displayDateWithHours(row.upcomingVisitDate)
      : 'No upcoming visit',
    status: <StatusIndicator perspective="employee" status={row.status} />
  }));
}

interface ReservationTableProps {
  data: EmployeeReservation[];
}

const EmployeeReservationTable = ({ data }: ReservationTableProps) => {
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

export default EmployeeReservationTable;
