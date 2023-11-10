import { z } from 'zod';

import { CleaningFrequency, Status } from '~/types/enums';

import { address } from '../forms/orderService';

import { ISOString, decimalToFloat } from './common';
import { employeeSchema } from './employee';
import { serviceForReservation } from './services';

export const visitSchema = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  startDate: ISOString,
  endDate: ISOString,
  includeDetergents: z.boolean(),
  cost: decimalToFloat,
  status: z.nativeEnum(Status),
  reservationId: z.number().int(),
  employees: z.array(employeeSchema).optional()
});

export const visitListSchema = z.array(visitSchema);

export const visitWithEmployeesSchema = visitSchema.extend({
  employees: z.array(employeeSchema)
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
  visits: z.array(visitSchema).optional(),
  services: z.array(serviceForReservation).optional(),
  address: address.optional()
});

export const reservationListSchema = z.array(reservationSchema);

export type Reservation = z.infer<typeof reservationSchema>;

export type Visit = z.infer<typeof visitSchema>;

export type VisitWithEmployees = z.infer<typeof visitWithEmployeesSchema>;
