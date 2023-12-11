import * as React from 'react';

import { frequencyToDescriptionMap } from '~/constants/mappings';
import { visit } from '~/constants/queryKeys';

import type { ReservationWithVisits } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/shadcn/ui/table';

import { displayDateWithHours, getClosestDateFromNow } from '~/utils/dateUtils';
import { getMainServiceForReservation } from '~/utils/reservationUtils';
import { getVisitStartEndDates } from '~/utils/visitUtils';

import DataTable from './DataTable';

function createReservationRows(data: ReservationWithVisits[]) {
  return data.map((reservation) => {
    return {
      id: reservation.id,
      mainServiceName: getMainServiceForReservation(reservation)?.name,
      frequencyName: frequencyToDescriptionMap.get(reservation.frequency),
      firstVisitDate: displayDateWithHours(
        getVisitStartEndDates(reservation.visits[0]!).startDate
      ),
      upcomingVisitDate: displayDateWithHours(
        getClosestDateFromNow(
          reservation.visits?.flatMap(
            (visit) => visit?.visitParts[0]?.startDate
          )
        )
      ),
      action: <Button href={`/reservations/${reservation.name}`}>Manage</Button>
    };
  });
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
    'Actions'
  ];

  return (
    <DataTable
      name="employeeTable"
      columns={columns}
      rows={createReservationRows(data)}
    />
  );
};

export default ReservationTable;
