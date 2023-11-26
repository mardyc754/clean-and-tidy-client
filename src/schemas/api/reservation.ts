import { z } from 'zod';

import { CleaningFrequency, Status } from '~/types/enums';

import { ISOString, decimalToFloat } from '../common';
import { address } from '../forms/orderService';
import { employeeSchema } from './employee';
import { serviceForReservation } from './services';

export const visitPartSchema = z.object({
  employeeId: z.number().int(),
  serviceId: z.number().int(),
  numberOfUnits: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: decimalToFloat,
  status: z.nativeEnum(Status)
});

export type VisitPart = z.infer<typeof visitPartSchema>;

export const visitPartWithEmployeesSchema = visitPartSchema.extend({
  employee: employeeSchema
});

export type VisitPartWithEmployees = z.infer<
  typeof visitPartWithEmployeesSchema
>;

export const visitSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  includeDetergents: z.boolean(),
  reservationId: z.number().int(),
  visitParts: z.array(visitPartWithEmployeesSchema)
});

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  frequency: z.nativeEnum(CleaningFrequency),
  endDate: ISOString,
  weekDay: z.number().int().min(0).max(6),
  status: z.nativeEnum(Status),
  bookerEmail: z.string().email(),
  addressId: z.number().int(),
  bookerFirstName: z.string().max(50),
  bookerLastName: z.string().max(50),
  extraInfo: z.string().max(500).nullish()
});

export const reservationWithServicesSchema = reservationSchema.extend({
  services: z.array(serviceForReservation)
});

export const reservationWithVisitsSchema = reservationWithServicesSchema.extend(
  {
    visits: z.array(visitSchema),
    address: address.optional()
  }
);

export const reservationWithExtendedVisitsSchema =
  reservationWithVisitsSchema.merge(reservationWithServicesSchema);

export const visitWithReservationSchema = visitSchema.extend({
  reservation: reservationWithServicesSchema
});

export const visitWithStatusAndReservationSchema = z.object({
  visit: visitWithReservationSchema,
  status: z.nativeEnum(Status)
});

export const employeeWithVisitsSchema = employeeSchema.extend({
  visits: visitWithStatusAndReservationSchema.array()
});

export type Reservation = z.infer<typeof reservationSchema>;

export type ReservationWithVisits = z.infer<typeof reservationWithVisitsSchema>;

export type ReservationWithServices = z.infer<
  typeof reservationWithServicesSchema
>;
export type ReservationWithExtendedVisits = z.infer<
  typeof reservationWithExtendedVisitsSchema
>;

export type Visit = z.infer<typeof visitSchema>;

export type VisitWithReservation = z.infer<typeof visitWithReservationSchema>;

export type VisitWithStatusAndReservation = z.infer<
  typeof visitWithStatusAndReservationSchema
>;

export type EmployeeWithVisits = z.infer<typeof employeeWithVisitsSchema>;
