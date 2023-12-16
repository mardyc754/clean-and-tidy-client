import { omit } from 'lodash';

import type {
  EmployeeWithVisits,
  ReservationWithVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';

import type { VisitEvent } from '~/components/organisms/scheduler/Scheduler';

import { convertISOStringToDate } from './dateUtils';
import {
  createReservationTitle,
  createReservationTitleForEmployee,
  createVisitPartTitleForAdmin
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
  return employees.map((employee) => ({
    ...omit(employee, 'visitParts'),
    visits: employee.visitParts.map((visit) => ({
      title: createVisitPartTitleForAdmin(employee, visit),
      start: convertISOStringToDate(visit.startDate),
      end: convertISOStringToDate(visit.endDate),
      resource: { visitId: visit.id }
    }))
  }));
};

export const getMaxEndDateFromReservationVisits = (visits: VisitEvent[]) => {
  const endDates = visits.map((visit) => visit.end!);

  const maxDate = Math.max(...endDates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};
