import { z } from 'zod';
import { CleaningFrequency } from '~/types/forms';

import { ISOString, decimalToFloat } from './common';

enum RecurringReservationStatus {
  TO_BE_CONFIRMED = 'TO_BE_CONFIRMED',
  CLOSED = 'CLOSED',
  TO_BE_CANCELLED = 'TO_BE_CANCELLED',
  CANCELLED = 'CANCELLED'
}

enum ReservationStatus {
  TO_BE_CONFIRMED = 'TO_BE_CONFIRMED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  TO_BE_CANCELLED = 'TO_BE_CANCELLED',
  CANCELLED = 'CANCELLED'
}

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  startDate: ISOString,
  endDate: ISOString,
  includeDetergents: z.boolean(),
  cost: decimalToFloat,
  status: z.nativeEnum(ReservationStatus),
  employees: z.array(z.number().int()),
  recurringReservationId: z.number().int()
});

export const recurringReservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  frequency: z.nativeEnum(CleaningFrequency),
  endDate: ISOString,
  weekDay: z.number().int().min(0).max(6),
  status: z.nativeEnum(RecurringReservationStatus),
  clientId: z.number().int(),
  addressId: z.number().int(),
  bookerFirstName: z.string().max(50),
  bookerLastName: z.string().max(50)
});

export const recurringReservationWithReservationsSchema =
  recurringReservationSchema.extend({
    reservations: z.array(reservationSchema).optional()
  });

export type RecurringReservation = z.infer<typeof recurringReservationSchema>;

export type RecurringReservationWithReservations = z.infer<
  typeof recurringReservationWithReservationsSchema
>;

export type Reservation = z.infer<typeof reservationSchema>;
