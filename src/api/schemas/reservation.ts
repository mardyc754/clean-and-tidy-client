import { ZodType, z } from 'zod';
import { CleaningFrequency } from '~/types/forms';

import { clientDataSchema } from './client';
import { ISOString, decimalToFloat } from './common';
import { orderedServiceSchema } from './services';

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
  email: z.string().email()
});

export const contactDetailsForm = address.merge(contactDetails);

export const orderedService = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  unit: z.object({
    name: z.string().max(40),
    price: decimalToFloat,
    duration: z.number().max(480)
  }),
  isMainServiceForReservation: z.boolean(),
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
  // endDate: z.string().datetime(),
  address: address.or(z.number().int()),
  contactDetails: contactDetails,
  services: z
    .array(
      orderedServiceSchema
        .pick({
          id: true,
          numberOfUnits: true,
          isMainServiceForReservation: true
        })
        .transform((val) => ({
          serviceId: val.id,
          numberOfUnits: val.numberOfUnits,
          isMainServiceForReservation: val.isMainServiceForReservation
        }))
    )
    .refine(
      (arr) =>
        arr.filter((service) => service.isMainServiceForReservation).length ===
        1
    )
});

export const orderServiceSubmitDataSchema = z.object({
  numberOfUnits: z
    .number()
    .int()
    .max(500, { message: 'Must be less than 500' })
    .min(30, { message: 'Must be atleast 30' }),
  cleaningFrequency: z.nativeEnum(CleaningFrequency, {
    required_error: 'Cleaning frequency is required',
    invalid_type_error: 'Cleaning frequency is required'
  }),
  startDate: z.date({
    required_error: 'Select a date',
    invalid_type_error: 'Select a date'
  }),
  hourDate: z.date({
    required_error: 'Select an hour',
    invalid_type_error: 'Select an hour'
  }),
  includeDetergents: z.boolean(),
  extraServices: z.array(z.number().int().or(z.undefined())).optional()
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

export type OrderServiceClientData = z.infer<
  typeof orderServiceClientDataSchema
>;

export type OrderServiceSubmitData = z.infer<
  typeof orderServiceSubmitDataSchema
>;

export type OrderServiceInputData = z.infer<typeof orderServiceInputDataSchema>;

export type Address = z.infer<typeof address>;

export type ContactDetails = z.infer<typeof contactDetails>;

export type ContactDetailsFormData = z.infer<typeof contactDetailsForm>;

export type ReservationFormData = z.infer<typeof reservationFormData>;

export type RecurringReservationCreationData = z.infer<
  typeof recurringReservationCreationSchema
>;

export type RecurringReservation = z.infer<typeof recurringReservationSchema>;

export type RecurringReservationWithReservations = z.infer<
  typeof recurringReservationWithReservationsSchema
>;

export type Reservation = z.infer<typeof reservationSchema>;
