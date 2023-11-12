import { omit } from 'lodash';

import type {
  Reservation,
  VisitWithReservation
} from '~/schemas/api/reservation';

import { convertISOStringToDate } from './dateUtils';
import {
  createReservationTitle,
  createReservationTitleForEmployee
} from './reservationUtils';

export const makeReservationTitle = (reservation: Reservation) => {
  const services = reservation.services ?? [];

  // const prioritizedServices = services.toSorted(
  //   (a, b) =>
  //     Number(a.isMainServiceForReservation) -
  //     Number(b.isMainServiceForReservation)
  // );

  const mainService = services.find(
    (service) => service.isMainServiceForReservation
  )!;
  const restServices = services.filter(
    (service) => !service.isMainServiceForReservation
  );

  return [mainService, ...restServices]
    .map((data) => data.service.name)
    .join(' + ');
};

export const getEventsFromReservation = (reservation: Reservation) => {
  const visits = reservation.visits ?? [];

  const title = createReservationTitle(reservation);

  return visits.map((visit) => ({
    title: title,
    start: convertISOStringToDate(visit.startDate),
    end: convertISOStringToDate(visit.endDate),
    resource: omit(visit, ['startDate', 'endDate', 'name'])
  }));
};

export const getEventsFromVisits = (visits: VisitWithReservation[]) => {
  return visits.map((visit) => ({
    title: createReservationTitleForEmployee(visit.reservation),
    start: convertISOStringToDate(visit.startDate),
    end: convertISOStringToDate(visit.endDate),
    resource: omit(visit, ['startDate', 'endDate', 'name'])
  }));
};

export const getMaxEndDateFromReservations = (reservations: Reservation[]) => {
  const visits = reservations.flatMap((reservation) => reservation.visits);

  const dates = visits.map((visit) => visit?.endDate);

  const maxDate = Math.max(...dates.map((date) => new Date(date!).getTime()));

  return new Date(maxDate);
};

export const getMaxEndDateFromReservationVisits = (
  visits: ReturnType<typeof getEventsFromReservation>
) => {
  const endDates = visits.map((visit) => visit?.end);

  const maxDate = Math.max(...endDates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};
