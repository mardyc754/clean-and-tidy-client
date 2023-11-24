import { z } from 'zod';

import { CleaningFrequency, Status } from '~/types/enums';

import { ISOString, decimalToFloat } from '../common';
import { address } from '../forms/orderService';
import { employeeSchema, employeeWithStatusSchema } from './employee';
import { serviceForReservation } from './services';

export const visitSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  startDate: ISOString,
  endDate: ISOString,
  includeDetergents: z.boolean(),
  cost: decimalToFloat,
  reservationId: z.number().int()
});

export const visitWithEmployeesSchema = visitSchema.extend({
  employees: z.array(employeeWithStatusSchema)
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

export const reservationWithExtendedVisitsSchema = reservationWithVisitsSchema
  .extend({
    visits: z.array(visitWithEmployeesSchema)
  })
  .merge(reservationWithServicesSchema);

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

export type VisitWithEmployees = z.infer<typeof visitWithEmployeesSchema>;

export type EmployeeWithVisits = z.infer<typeof employeeWithVisitsSchema>;
