import { z } from 'zod';
import {
  CleaningFrequency,
  RecurringReservationStatus,
  ReservationStatus
} from '~/types/enums';

import { ISOString, decimalToFloat } from './common';

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
