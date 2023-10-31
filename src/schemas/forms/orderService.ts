import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { basicService } from '~/schemas/api/services';
import { ISOString } from '~/schemas/api/common';

import { CleaningFrequency } from '~/types/enums';

// CLEANING DETAILS PAGE
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

export type OrderServiceSubmitData = z.infer<
  typeof orderServiceSubmitDataSchema
>;

export type OrderServiceInputData = z.infer<typeof orderServiceInputDataSchema>;

export const cleaningDetailsResolver = zodResolver(
  orderServiceSubmitDataSchema
);

// CONTACT DETAILS PAGE
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

export type Address = z.infer<typeof address>;

export type ContactDetails = z.infer<typeof contactDetails>;

export type ContactDetailsFormData = z.infer<typeof contactDetailsForm>;

export const contactDetailsResolver = zodResolver(contactDetailsForm);

// SUMMARY PAGE
export const reservationCreationDataSchema = z.object({
  endDate: ISOString,
  startDate: ISOString,
  includeDetergents: z.boolean(),
  cost: z.number(),
  employeeIds: z.array(z.number().int())
});

export const orderedServiceSchema = basicService.extend({
  isMainServiceForReservation: z.boolean(),
  numberOfUnits: z.number().int().max(500).min(1)
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

export type RecurringReservationCreationData = z.infer<
  typeof recurringReservationCreationSchema
>;
