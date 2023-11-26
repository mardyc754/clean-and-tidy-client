import type {
  EmployeeWithVisits,
  ReservationWithVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';
import type {
  ReservationWithExtendedVisits,
  VisitWithReservation
} from '~/schemas/api/reservation';

import type { VisitEvent } from '~/components/organisms/scheduler/Scheduler';

import { convertISOStringToDate } from './dateUtils';
import {
  createReservationTitle,
  createReservationTitleForAdmin,
  createReservationTitleForEmployee
} from './reservationUtils';
import { getVisitStartEndDates } from './visitUtils';

export const getEventsFromReservation = (
  reservation: ReservationWithVisits
) => {
  const visits = reservation.visits ?? [];

  const title = createReservationTitle(reservation);

  return visits.map((visit) => {
    const { startDate, endDate } = getVisitStartEndDates(visit);
    return {
      title: title,
      start: convertISOStringToDate(startDate),
      end: convertISOStringToDate(endDate),
      resource: { visitId: visit.id }
    };
  });
};

export const getEventsFromVisitParts = (
  visits: VisitPartWithServiceAndReservation[]
) => {
  return visits.map((visit) => {
    return {
      title: createReservationTitleForEmployee(
        visit.reservation,
        visit.service
      ),
      start: convertISOStringToDate(visit.startDate),
      end: convertISOStringToDate(visit.endDate),
      resource: { visitId: visit.id }
    };
  });
};

export const getEventsFromEmployees = (employees: EmployeeWithVisits[]) => {
  return employees.flatMap((employee) => {
    const employeeVisits = employee.visits.flatMap(({ visit }) => visit);
    return employeeVisits.map((visit) => ({
      title: createReservationTitleForAdmin(employee, visit.reservation),
      start: convertISOStringToDate(visit.startDate),
      end: convertISOStringToDate(visit.endDate),
      resource: { visitId: visit.id }
    }));
  });
};

export const getMaxEndDateFromReservations = (
  reservations: ReservationWithExtendedVisits[]
) => {
  const visits = reservations.flatMap((reservation) => reservation.visits);

  const dates = visits.map((visit) => visit?.endDate);

  const maxDate = Math.max(...dates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};

export const getMaxEndDateFromReservationVisits = (visits: VisitEvent[]) => {
  const endDates = visits.map((visit) => visit.end!);

  const maxDate = Math.max(...endDates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};
