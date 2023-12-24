import { z } from 'zod';

import { CleaningFrequency, Status } from '~/types/enums';

import { decimalToFloat } from '../common';
import { address } from '../forms/orderService';
import { employeeSchema } from './employee';
import { basicService, serviceForVisitPart } from './services';

export const visitPartSchema = z.object({
  id: z.number().int(),
  employeeId: z.number().int(),
  serviceId: z.number().int(),
  numberOfUnits: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: decimalToFloat,
  status: z.nativeEnum(Status)
});

export type VisitPart = z.infer<typeof visitPartSchema>;

export const visitPartWithEmployeeSchema = visitPartSchema.extend({
  employee: employeeSchema
});

export const visitPartWithVisitData = visitPartWithEmployeeSchema.extend({
  includeDetergents: z.boolean()
});

export type VisitPartWithVisitData = z.infer<typeof visitPartWithVisitData>;

export type VisitPartWithEmployees = z.infer<
  typeof visitPartWithEmployeeSchema
>;

export const visitSchema = z.object({
  id: z.number().int(),
  includeDetergents: z.boolean(),
  canDateBeChanged: z.boolean(),
  reservationId: z.number().int(),
  visitParts: z.array(visitPartSchema)
});

export const visitSchemaWithEmployees = visitSchema.extend({
  visitParts: z.array(visitPartWithEmployeeSchema)
});

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  frequency: z.nativeEnum(CleaningFrequency),
  // endDate: ISOString,
  status: z.nativeEnum(Status),
  bookerEmail: z.string().email(),
  addressId: z.number().int(),
  bookerFirstName: z.string().max(50),
  bookerLastName: z.string().max(50),
  extraInfo: z.string().max(500).nullish()
});

export const employeeReservationsSchema = reservationSchema.extend({
  visits: z.array(visitSchema),
  services: z.array(serviceForVisitPart)
});

export const reservationWithVisitsSchema = reservationSchema.extend({
  visits: z.array(visitSchema),
  services: z.array(serviceForVisitPart),
  address: address.optional()
});

export const reservationWithExtendedVisitsSchema =
  reservationWithVisitsSchema.extend({
    visits: z.array(visitSchemaWithEmployees),
    services: z.array(serviceForVisitPart)
  });

export const visitWithReservationSchema = visitSchemaWithEmployees.extend({
  reservation: employeeReservationsSchema
});

export const visitWithStatusAndReservationSchema = z.object({
  visit: visitWithReservationSchema,
  status: z.nativeEnum(Status)
});

export const visitPartWithService = visitPartSchema.extend({
  service: basicService
});

export const visitPartWithServiceAndReservation = visitPartWithService.extend({
  reservation: reservationSchema.extend({
    address: address.optional()
  })
});

export const employeeWithVisitsSchema = employeeSchema.extend({
  visitParts: z.array(visitPartWithServiceAndReservation)
});

export type VisitPartWithService = z.infer<typeof visitPartWithService>;

export type VisitPartWithServiceAndReservation = z.infer<
  typeof visitPartWithServiceAndReservation
>;

export type Reservation = z.infer<typeof reservationSchema>;

export type ReservationWithVisits = z.infer<typeof reservationWithVisitsSchema>;

export type EmployeeReservation = z.infer<typeof employeeReservationsSchema>;

export type ReservationWithExtendedVisits = z.infer<
  typeof reservationWithExtendedVisitsSchema
>;

export type Visit = z.infer<typeof visitSchema>;

export type VisitWithEmployees = z.infer<typeof visitSchemaWithEmployees>;

export type VisitWithReservation = z.infer<typeof visitWithReservationSchema>;

export type VisitWithStatusAndReservation = z.infer<
  typeof visitWithStatusAndReservationSchema
>;

export type EmployeeWithVisits = z.infer<typeof employeeWithVisitsSchema>;
