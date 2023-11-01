import type { Reservation } from '~/schemas/api/reservation';

import { convertISOStringToDate } from './dateUtils';

export const getEventsFromReservations = (reservations: Reservation[]) => {
  return reservations.map((reservation) => ({
    title: reservation.name,
    start: convertISOStringToDate(reservation.startDate),
    end: convertISOStringToDate(reservation.endDate)
  }));
};
