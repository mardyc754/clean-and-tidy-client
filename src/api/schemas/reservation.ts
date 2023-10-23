import { z } from 'zod';
import { CleaningFrequency } from '~/types/forms';

import { clientDataSchema } from './client';
import { ISOString } from './common';
import { orderedServiceSchema } from './services';

export const address = z.object({
  street: z.string().max(40),
  houseNumber: z.string().max(6),
  postCode: z.string().length(6),
  city: z.string().max(40)
});

export const contactDetails = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  phone: z.string().max(15),
  email: z.string().email(),
  address
});

export const orderedService = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  unit: z.object({
    name: z.string().max(40),
    price: z.string().transform((val) => parseFloat(val.replace(',', '.'))),
    duration: z.number().max(480)
  }),
  isMainServiceInReservation: z.boolean(),
  numberOfUnits: z.number().int().max(500).min(30)
});

export const reservationFormData = z.object({
  numberOfUnits: z.number().int().max(500).min(30),
  unitName: z.string().max(40),
  totalCost: z.number().max(10000).min(0),
  cleaningFrequency: z.nativeEnum(CleaningFrequency),
  totalDuration: z.number().max(480).min(0),
  startDate: z.date(),
  hourDate: z.date(),
  includeDetergents: z.boolean(),
  orderedServices: z.array(orderedService),
  contactDetails
});

export const orderServiceSubmitDataSchema = z.object({
  numberOfUnits: z.number().int().max(500).min(30),
  cleaningFrequency: z.nativeEnum(CleaningFrequency),
  startDate: z.date(),
  hourDate: z.date(),
  includeDetergents: z.boolean(),
  extraServices: z.array(z.number().int()).optional()
});

export const orderServiceInputDataSchema = orderServiceSubmitDataSchema.extend({
  cleaningFrequency: z.nativeEnum(CleaningFrequency).nullable(),
  startDate: z.date().nullable(),
  hourDate: z.date().nullable()
});

export const orderServiceClientDataSchema = clientDataSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true
});

export const reservationCreationDataSchema = z.object({
  endDate: ISOString,
  startDate: ISOString,
  includeDetergents: z.boolean(),
  cost: z.number(),
  employeeIds: z.array(z.number().int())
});

export const recurringReservationCreationSchema = z.object({
  frequency: z.nativeEnum(CleaningFrequency),
  clientId: z.number().int(), // it can be an client email as well
  reservationData: reservationCreationDataSchema,
  address: z
    .object({
      street: z.string().max(40),
      houseNumber: z.string().max(6),
      postCode: z.string().length(6),
      city: z.string().max(40)
    })
    .or(z.number().int()),
  services: z
    .array(orderedServiceSchema)
    .refine(
      (arr) =>
        arr.filter((service) => service.isMainServiceInReservation).length === 1
    )
});

export type OrderServiceClientData = z.infer<
  typeof orderServiceClientDataSchema
>;

export type OrderServiceSubmitData = z.infer<
  typeof orderServiceSubmitDataSchema
>;

export type OrderServiceInputData = z.infer<typeof orderServiceInputDataSchema>;

export type Address = z.infer<typeof address>;

export type ContactDetails = z.infer<typeof contactDetails>;

export type ReservationFormData = z.infer<typeof reservationFormData>;

export type RecurringReservationCreationData = z.infer<
  typeof recurringReservationCreationSchema
>;
