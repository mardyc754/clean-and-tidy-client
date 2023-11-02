import type { Visit } from '~/schemas/api/reservation';

import { convertISOStringToDate } from './dateUtils';

export const getEventsFromReservations = (reservations: Visit[]) => {
  return reservations.map((reservation) => ({
    title: reservation.name,
    start: convertISOStringToDate(reservation.startDate),
    end: convertISOStringToDate(reservation.endDate)
  }));
};
