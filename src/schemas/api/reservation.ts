import { z } from 'zod';

import { CleaningFrequency, ReservationStatus } from '~/types/enums';

import { address } from '../forms/orderService';

import { ISOString, decimalToFloat } from './common';
import { employeeSchema } from './employee';
import { serviceForReservation } from './services';

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  startDate: ISOString,
  endDate: ISOString,
  includeDetergents: z.boolean(),
  cost: decimalToFloat,
  status: z.nativeEnum(ReservationStatus),
  recurringReservationId: z.number().int()
});

export const reservationWithEmployeesSchema = reservationSchema.extend({
  employees: z.array(employeeSchema)
});

export const recurringReservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  frequency: z.nativeEnum(CleaningFrequency),
  endDate: ISOString,
  weekDay: z.number().int().min(0).max(6),
  status: z.nativeEnum(ReservationStatus),
  bookerEmail: z.string().email(),
  addressId: z.number().int(),
  bookerFirstName: z.string().max(50),
  bookerLastName: z.string().max(50),
  reservations: z.array(reservationSchema).optional(),
  services: z.array(serviceForReservation).optional(),
  address: address.optional()
});

export type RecurringReservation = z.infer<typeof recurringReservationSchema>;

export type Reservation = z.infer<typeof reservationSchema>;

export type ReservationWithEmployees = z.infer<
  typeof reservationWithEmployeesSchema
>;
