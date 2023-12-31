import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { basicService } from '~/schemas/api/services';
import { ISOString } from '~/schemas/common';

import { CleaningFrequency } from '~/types/enums';

import { employeeSchema } from '../api/employee';

// CLEANING DETAILS PAGE
export const orderServiceSubmitDataSchema = z.object({
  numberOfUnits: z
    .number()
    .int()
    .max(500, { message: 'Must be less than 500' })
    .min(1, { message: `Must be atleast 1` }),
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
  extraServices: z.array(z.number().int().or(z.undefined())).optional(),
  totalCost: z.number().min(0)
});

export function createOrderServiceSubmitDataSchema(
  minNumberOfUnits?: number | null,
  minCost?: number | null
) {
  const minUnits = minNumberOfUnits ?? 0;

  const schema = orderServiceSubmitDataSchema.extend({
    numberOfUnits: z
      .number()
      .int()
      .max(500, { message: 'Must be less than 500' })
      .min(minUnits, {
        message: `Must be atleast ${minUnits}`
      }),
    totalCost: z.number().min(minCost ?? 0, {
      message: `Total cost must be greater than ${minCost}`
    })
  });

  if (!minNumberOfUnits) {
    return schema.omit({ numberOfUnits: true });
  }

  if (!minCost) {
    return schema.omit({ totalCost: true });
  }

  return schema;
}

export const orderServiceInputDataSchema = orderServiceSubmitDataSchema.extend({
  cleaningFrequency: z.nativeEnum(CleaningFrequency).nullable(),
  startDate: z.date().nullable(),
  hourDate: z.date().nullable()
});

export type OrderServiceSubmitData = z.infer<
  typeof orderServiceSubmitDataSchema
>;

export type OrderServiceInputData = z.infer<typeof orderServiceInputDataSchema>;

export function cleaningDetailsResolver(
  minNumberOfUnits?: number | null,
  minTotalCost?: number | null
) {
  return zodResolver(
    createOrderServiceSubmitDataSchema(minNumberOfUnits, minTotalCost)
  );
}

export const timeslot = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
});

export type Timeslot = z.infer<typeof timeslot>;

export const employeeAvailabilityData = employeeSchema.extend({
  workingHours: z.array(timeslot),
  numberOfWorkingHours: z.number(),
  services: z.array(z.number().int())
});

export type EmployeeAvailabilityData = z.infer<typeof employeeAvailabilityData>;

export const busyHoursData = z.object({
  employees: z.array(employeeAvailabilityData),
  busyHours: z.array(timeslot)
});

export type BusyHoursData = z.infer<typeof busyHoursData>;

// CONTACT DETAILS PAGE
export const address = z.object({
  street: z.string().max(40),
  houseNumber: z.string().max(6),
  postCode: z.string().length(6)
});

export const contactDetails = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must have at most 50 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must have at most 50 characters' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .max(15, { message: 'Phone number must have at most 15 characters' }),
  email: z.string().email()
});

export const extraInfoDataSchema = z.object({
  extraInfo: z
    .string()
    .max(500, { message: 'Extra info must have at most 500 characters' })
    .nullable()
});

export const contactDetailsForm = address
  .merge(contactDetails)
  .merge(extraInfoDataSchema);

export type Address = z.infer<typeof address>;

export type ContactDetails = z.infer<typeof contactDetails>;

export type ContactDetailsFormData = z.infer<typeof contactDetailsForm>;

export const contactDetailsResolver = zodResolver(contactDetailsForm);

// SUMMARY PAGE
export const visitCreationDataSchema = z.object({
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

export const reservationCreationSchema = z
  .object({
    frequency: z.nativeEnum(CleaningFrequency),
    bookerEmail: z.string().email(),
    visitParts: z.array(
      z.object({
        employeeId: z.number().int(),
        serviceId: z.number().int(),
        numberOfUnits: z.number().int(),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        cost: z.number().min(0)
      })
    ),
    address: address.or(z.number().int()),
    contactDetails: contactDetails,
    includeDetergents: z.boolean(),

    services: z
      .array(
        orderedServiceSchema
          .pick({
            id: true,
            isMainServiceForReservation: true
          })
          .transform((val) => ({
            serviceId: val.id,
            isMainServiceForReservation: val.isMainServiceForReservation
          }))
      )
      .refine(
        (arr) =>
          arr.filter((service) => service.isMainServiceForReservation)
            .length === 1
      )
  })
  .merge(extraInfoDataSchema);

export type ReservationCreationData = z.infer<typeof reservationCreationSchema>;
